import { describe, it, expect } from "vitest";
import { range } from "../range";

describe("circular", () => {
  it("generates a integer range from 0 to end", () => {
    expect( Array.from(range(3)) ).toEqual([0, 1, 2]);
  });

  it("generates integer series from start to end", () => {
    expect( Array.from(range(1, 4)) ).toEqual([1, 2, 3]);
  });

  it("generates an integer series with provided step", () => {
    expect( Array.from(range(1, 11, 3)) ).toEqual([1, 4, 7, 10]);
  });

  it("throw a TypeError if args are not integers", () => {
    ///@ts-expect-error
    expect( () => range("asdfasdf").next() ).toThrow(TypeError);
    expect( () => range(1.2).next() ).toThrow(TypeError);
    ///@ts-expect-error
    expect( () =>  range(3, "asdfdf").next() ).toThrow(TypeError);
  });

  it("throw an Error step is less or equal to zero", () => {
    expect( () =>  range(3, 10, -1).next() ).toThrow(Error);
    expect( () =>  range(3, 10, 0).next() ).toThrow(Error);
    expect( () =>  range(3, 10, 0.2).next() ).toThrow(Error);
  });
});

