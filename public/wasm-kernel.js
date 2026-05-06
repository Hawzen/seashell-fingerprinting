import {
  WASI,
  File,
  OpenFile,
  ConsoleStdout,
} from "./vendor/browser_wasi_shim/index.js";

class JsShellKernel {
  constructor(model) {
    this.model = model;
    this.kind = "JS fallback";
  }

  setModel(model) {
    this.model = model;
  }

  reconstruct(coords) {
    const { mean, components, angle_count: angleCount } = this.model;
    const fingerprint = new Float64Array(angleCount);
    for (let angle = 0; angle < angleCount; angle += 1) {
      let value = mean[angle];
      for (let pc = 0; pc < components.length; pc += 1) {
        value += (coords[pc] || 0) * components[pc][angle];
      }
      fingerprint[angle] = Math.max(value, 0.02);
    }
    let total = 0;
    for (const value of fingerprint) total += value;
    const meanRadius = total / fingerprint.length || 1;
    for (let i = 0; i < fingerprint.length; i += 1) {
      fingerprint[i] /= meanRadius;
    }
    return fingerprint;
  }

  distance(left, right) {
    const count = Math.min(left.length, right.length);
    if (!count) return 0;
    let total = 0;
    for (let index = 0; index < count; index += 1) {
      const delta = left[index] - right[index];
      total += delta * delta;
    }
    return Math.sqrt(total / count);
  }

  contourDistance(left, right) {
    const pointCount = Math.floor(Math.min(left.length, right.length) / 2);
    if (!pointCount) return 0;
    let direct = 0;
    let reversed = 0;
    for (let index = 0; index < pointCount; index += 1) {
      const directIndex = index * 2;
      const reverseIndex = ((pointCount - index) % pointCount) * 2;
      const rightX = right[directIndex];
      const rightY = right[directIndex + 1];
      const dx = left[directIndex] - rightX;
      const dy = left[directIndex + 1] - rightY;
      const rx = left[reverseIndex] - rightX;
      const ry = left[reverseIndex + 1] - rightY;
      direct += dx * dx + dy * dy;
      reversed += rx * rx + ry * ry;
    }
    return Math.sqrt(Math.min(direct, reversed) / pointCount);
  }
}

class HaskellWasmShellKernel {
  constructor(instance, model) {
    this.instance = instance;
    this.exports = instance.exports;
    this.kind = "Haskell WASM";
    this.model = null;
    this.meanPtr = 0;
    this.componentPtr = 0;
    this.coordPtr = 0;
    this.outPtr = 0;
    this.leftPtr = 0;
    this.rightPtr = 0;
    this.contourLeftPtr = 0;
    this.contourRightPtr = 0;
    this.byteLength = 0;
    this.setModel(model);
  }

  malloc(byteLength) {
    const ptr = this.exports.malloc(byteLength);
    if (!ptr) throw new Error("WASM malloc failed");
    return ptr;
  }

  free(ptr) {
    if (ptr) this.exports.free(ptr);
  }

  f64() {
    return new Float64Array(this.exports.memory.buffer);
  }

  setFloat64(ptr, values) {
    this.f64().set(values, ptr / 8);
  }

  getFloat64(ptr, count) {
    return this.f64().slice(ptr / 8, ptr / 8 + count);
  }

  setModel(model) {
    if (this.meanPtr) {
      this.free(this.meanPtr);
      this.free(this.componentPtr);
      this.free(this.coordPtr);
      this.free(this.outPtr);
      this.free(this.leftPtr);
      this.free(this.rightPtr);
      this.free(this.contourLeftPtr);
      this.free(this.contourRightPtr);
    }

    this.model = model;
    const angleCount = model.angle_count;
    const componentCount = model.components.length;
    const contourValueCount = (model.contour_points || 0) * 2;
    const mean = Float64Array.from(model.mean);
    const components = Float64Array.from(model.components.flat());

    this.meanPtr = this.malloc(mean.byteLength);
    this.componentPtr = this.malloc(components.byteLength);
    this.coordPtr = this.malloc(componentCount * 8);
    this.outPtr = this.malloc(angleCount * 8);
    this.leftPtr = this.malloc(angleCount * 8);
    this.rightPtr = this.malloc(angleCount * 8);
    this.contourLeftPtr = contourValueCount ? this.malloc(contourValueCount * 8) : 0;
    this.contourRightPtr = contourValueCount ? this.malloc(contourValueCount * 8) : 0;
    this.setFloat64(this.meanPtr, mean);
    this.setFloat64(this.componentPtr, components);
  }

  reconstruct(coords) {
    const angleCount = this.model.angle_count;
    const componentCount = this.model.components.length;
    const coordValues = new Float64Array(componentCount);
    for (let i = 0; i < componentCount; i += 1) {
      coordValues[i] = coords[i] || 0;
    }
    this.setFloat64(this.coordPtr, coordValues);
    this.exports.reconstructFingerprint(
      this.meanPtr,
      this.componentPtr,
      this.coordPtr,
      angleCount,
      componentCount,
      this.outPtr,
    );
    return this.getFloat64(this.outPtr, angleCount);
  }

  distance(left, right) {
    const angleCount = Math.min(this.model.angle_count, left.length, right.length);
    this.setFloat64(this.leftPtr, left.slice(0, angleCount));
    this.setFloat64(this.rightPtr, right.slice(0, angleCount));
    return this.exports.fingerprintDistance(this.leftPtr, this.rightPtr, angleCount);
  }

  contourDistance(left, right) {
    if (!this.exports.contourDistance || !this.contourLeftPtr || !this.contourRightPtr) {
      return new JsShellKernel(this.model).contourDistance(left, right);
    }
    const pointCount = Math.min(this.model.contour_points || 0, Math.floor(left.length / 2), Math.floor(right.length / 2));
    const valueCount = pointCount * 2;
    this.setFloat64(this.contourLeftPtr, left.slice(0, valueCount));
    this.setFloat64(this.contourRightPtr, right.slice(0, valueCount));
    return this.exports.contourDistance(this.contourLeftPtr, this.contourRightPtr, pointCount);
  }
}

export async function createShellKernel(model, wasmUrl) {
  try {
    const fds = [
      new OpenFile(new File([])),
      ConsoleStdout.lineBuffered((line) => console.log(`[WASI] ${line}`)),
      ConsoleStdout.lineBuffered((line) => console.warn(`[WASI] ${line}`)),
    ];
    const wasi = new WASI(["shell-kernel"], [], fds);
    const response = await fetch(wasmUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`${wasmUrl} returned ${response.status}`);
    const wasm = await WebAssembly.compile(await response.arrayBuffer());
    const instance = await WebAssembly.instantiate(wasm, {
      wasi_snapshot_preview1: wasi.wasiImport,
    });
    wasi.initialize(instance);
    instance.exports.hs_init(0, 0);
    return new HaskellWasmShellKernel(instance, model);
  } catch (error) {
    console.warn("Haskell WASM kernel unavailable; using JS fallback.", error);
    return new JsShellKernel(model);
  }
}
