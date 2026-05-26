// @ts-nocheck

let runtimePromise = null;

async function loadRuntime(runtime) {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      self.importScripts(runtime.pyodideScript);
      const pyodide = await self.loadPyodide({ indexURL: runtime.pyodideIndex });
      await pyodide.loadPackage(["numpy"]);
      pyodide.runPython(runtime.pythonCode);
      return pyodide;
    })();
  }
  return runtimePromise;
}

self.onmessage = async (event) => {
  const { id, payload } = event.data || {};
  try {
    const pyodide = await loadRuntime(payload.runtime);
    const rgbaPath = `/upload-${id}.rgba`;
    const maskPath = `/upload-${id}.mask`;
    pyodide.FS.writeFile(rgbaPath, new Uint8Array(payload.rgba));
    pyodide.FS.writeFile(maskPath, new Uint8Array(payload.mask));
    const raw = pyodide.runPython(
      `fingerprint_rgba_mask_file("${rgbaPath}", "${maskPath}", ${payload.width}, ${payload.height}, ${payload.contourPoints || 256}, 32)`,
    );
    try {
      pyodide.FS.unlink(rgbaPath);
      pyodide.FS.unlink(maskPath);
    } catch (_error) {
      // Best effort cleanup inside the worker FS.
    }
    self.postMessage({ id, ok: true, raw });
  } catch (error) {
    self.postMessage({ id, ok: false, error: error?.message || "Worker fingerprint failed" });
  }
};
