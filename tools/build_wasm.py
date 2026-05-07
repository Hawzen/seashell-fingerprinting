#!/usr/bin/env python3
"""Build the tiny browser WASM kernel used by the shell generator.

The WSL toolchain in this workspace can emit wasm code but is missing its wasm
linker/runtime target. This script writes the small module directly so the
artifact stays reproducible without adding npm, Rust, or system dependencies.
"""

from __future__ import annotations

import argparse
import struct
from pathlib import Path


VAL_I32 = 0x7F
VAL_F32 = 0x7D
EMPTY_BLOCK = 0x40


def uleb(value: int) -> bytes:
    if value < 0:
        raise ValueError("ULEB128 only supports non-negative values")
    out = bytearray()
    while True:
        byte = value & 0x7F
        value >>= 7
        if value:
            out.append(byte | 0x80)
        else:
            out.append(byte)
            return bytes(out)


def sleb(value: int) -> bytes:
    out = bytearray()
    more = True
    while more:
        byte = value & 0x7F
        value >>= 7
        sign_bit = byte & 0x40
        more = not ((value == 0 and not sign_bit) or (value == -1 and sign_bit))
        if more:
            byte |= 0x80
        out.append(byte)
    return bytes(out)


def vec(items: list[bytes]) -> bytes:
    return uleb(len(items)) + b"".join(items)


def section(section_id: int, payload: bytes) -> bytes:
    return bytes([section_id]) + uleb(len(payload)) + payload


def name(value: str) -> bytes:
    encoded = value.encode("utf-8")
    return uleb(len(encoded)) + encoded


def f32(value: float) -> bytes:
    return struct.pack("<f", value)


def instr(opcode: int, *operands: bytes | int) -> bytes:
    out = bytearray([opcode])
    for operand in operands:
        if isinstance(operand, int):
            out.extend(uleb(operand))
        else:
            out.extend(operand)
    return bytes(out)


def i32_const(value: int) -> bytes:
    return instr(0x41, sleb(value))


def f32_const(value: float) -> bytes:
    return instr(0x43, f32(value))


def local_get(index: int) -> bytes:
    return instr(0x20, index)


def local_set(index: int) -> bytes:
    return instr(0x21, index)


def f32_load() -> bytes:
    return instr(0x2A, 2, 0)


def f32_store() -> bytes:
    return instr(0x38, 2, 0)


def build_blend_body() -> bytes:
    # Parameters:
    # 0 contours_ptr, 1 weights_ptr, 2 out_ptr, 3 temp_ptr (reserved),
    # 4 neighbor_count, 5 value_count, 6 smooth (reserved), 7 passes (reserved)
    # Locals: 8 i, 9 n, 10 total, 11 accum, 12 weight
    body = bytearray()
    body.extend(vec([uleb(2) + bytes([VAL_I32]), uleb(3) + bytes([VAL_F32])]))

    body.extend(f32_const(0))
    body.extend(local_set(10))
    body.extend(i32_const(0))
    body.extend(local_set(9))

    # total = sum(weights)
    body.extend(bytes([0x02, EMPTY_BLOCK, 0x03, EMPTY_BLOCK]))  # block, loop
    body.extend(local_get(9))
    body.extend(local_get(4))
    body.extend(bytes([0x4E]))  # i32.ge_s
    body.extend(instr(0x0D, 1))  # br_if block
    body.extend(local_get(10))
    body.extend(local_get(1))
    body.extend(local_get(9))
    body.extend(i32_const(2))
    body.extend(bytes([0x74, 0x6A]))  # i32.shl, i32.add
    body.extend(f32_load())
    body.extend(bytes([0x92]))  # f32.add
    body.extend(local_set(10))
    body.extend(local_get(9))
    body.extend(i32_const(1))
    body.extend(bytes([0x6A]))  # i32.add
    body.extend(local_set(9))
    body.extend(instr(0x0C, 0))  # br loop
    body.extend(bytes([0x0B, 0x0B]))  # end loop, end block

    # if total <= 0: total = 1
    body.extend(local_get(10))
    body.extend(f32_const(0))
    body.extend(bytes([0x5F, 0x04, EMPTY_BLOCK]))  # f32.le, if
    body.extend(f32_const(1))
    body.extend(local_set(10))
    body.extend(bytes([0x0B]))  # end if

    body.extend(i32_const(0))
    body.extend(local_set(8))

    # for i in 0..value_count:
    body.extend(bytes([0x02, EMPTY_BLOCK, 0x03, EMPTY_BLOCK]))  # block, loop
    body.extend(local_get(8))
    body.extend(local_get(5))
    body.extend(bytes([0x4E]))  # i32.ge_s
    body.extend(instr(0x0D, 1))

    body.extend(f32_const(0))
    body.extend(local_set(11))
    body.extend(i32_const(0))
    body.extend(local_set(9))

    # for n in 0..neighbor_count:
    body.extend(bytes([0x02, EMPTY_BLOCK, 0x03, EMPTY_BLOCK]))  # block, loop
    body.extend(local_get(9))
    body.extend(local_get(4))
    body.extend(bytes([0x4E]))  # i32.ge_s
    body.extend(instr(0x0D, 1))

    # weight = weights[n] / total
    body.extend(local_get(1))
    body.extend(local_get(9))
    body.extend(i32_const(2))
    body.extend(bytes([0x74, 0x6A]))  # i32.shl, i32.add
    body.extend(f32_load())
    body.extend(local_get(10))
    body.extend(bytes([0x95]))  # f32.div
    body.extend(local_set(12))

    # accum += contours[n * value_count + i] * weight
    body.extend(local_get(11))
    body.extend(local_get(0))
    body.extend(local_get(9))
    body.extend(local_get(5))
    body.extend(bytes([0x6C]))  # i32.mul
    body.extend(local_get(8))
    body.extend(bytes([0x6A]))  # i32.add
    body.extend(i32_const(2))
    body.extend(bytes([0x74, 0x6A]))  # i32.shl, i32.add
    body.extend(f32_load())
    body.extend(local_get(12))
    body.extend(bytes([0x94, 0x92]))  # f32.mul, f32.add
    body.extend(local_set(11))

    body.extend(local_get(9))
    body.extend(i32_const(1))
    body.extend(bytes([0x6A]))  # i32.add
    body.extend(local_set(9))
    body.extend(instr(0x0C, 0))  # br inner loop
    body.extend(bytes([0x0B, 0x0B]))  # end inner loop, end inner block

    # out[i] = accum
    body.extend(local_get(2))
    body.extend(local_get(8))
    body.extend(i32_const(2))
    body.extend(bytes([0x74, 0x6A]))  # i32.shl, i32.add
    body.extend(local_get(11))
    body.extend(f32_store())

    body.extend(local_get(8))
    body.extend(i32_const(1))
    body.extend(bytes([0x6A]))  # i32.add
    body.extend(local_set(8))
    body.extend(instr(0x0C, 0))  # br outer loop
    body.extend(bytes([0x0B, 0x0B]))  # end outer loop, end outer block
    body.extend(bytes([0x0B]))  # end function
    return bytes(body)


def build_module() -> bytes:
    module = bytearray(b"\x00asm\x01\x00\x00\x00")

    params = bytes([VAL_I32, VAL_I32, VAL_I32, VAL_I32, VAL_I32, VAL_I32, VAL_F32, VAL_I32])
    func_type = b"\x60" + uleb(len(params)) + params + uleb(0)
    module.extend(section(1, vec([func_type])))
    module.extend(section(3, vec([uleb(0)])))
    module.extend(section(5, vec([b"\x00" + uleb(2)])))
    exports = [
        name("memory") + bytes([0x02]) + uleb(0),
        name("blend_contours") + bytes([0x00]) + uleb(0),
    ]
    module.extend(section(7, vec(exports)))
    body = build_blend_body()
    module.extend(section(10, vec([uleb(len(body)) + body])))
    return bytes(module)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=Path("public/shell-generator.wasm"))
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    payload = build_module()
    args.output.write_bytes(payload)
    print(f"wrote {args.output} ({len(payload)} bytes)")


if __name__ == "__main__":
    main()
