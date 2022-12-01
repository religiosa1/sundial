import { describe, it, expect } from "vitest";
import { circular } from "../circular";

describe("circular", () => {
  const initial = [1, 2, 3, 4, 5];

  it("circularly traverses an array from given index", () => {
    const result = circular(initial, 2);
    expect(Array.from(result)).toEqual([3, 4, 5, 1, 2]);
  })

  it("omits zero index if asked", () => {
    const result = circular(initial, 2, { omitFirst: true });
    expect(Array.from(result)).toEqual([4, 5, 1, 2]);
  });

  it("Returns an empty array, if called on 1-element array with omit flag", () => {
    const result = Array.from(circular([1], 0, { omitFirst: true }))
    expect(result).toEqual([]);
  });

  it("Throws a RangeError, if given index is out of range", () => {
    expect( () => Array.from(circular([], 0)) ).toThrow(RangeError);
  });

  it("accepts any array-like object", () => {
    const obj = {
      0: "a",
      1: "b",
      2: "c",
      length: 3
    };
    const result =Array.from(circular(obj, 2));
    expect(result).toEqual([ "c", "a", "b" ]);
  });

  it("throws a TypeError if called object isn't array-like", () => {
    ///@ts-expect-error
    expect( () => Array.from(circular(NaN, 0)) ).toThrow(TypeError);
  });
});

