import { describe, it, expect } from "vitest";
import { timeToDeg } from "$/utils/timeToDeg";

describe("timeToDeg", () => {
  it("converts Date value to the corresponding degree on a 24-hour clock", () => {
    expect( timeToDeg(new Date('1995-12-17T00:00:00')) ).toBe(0);
    expect( timeToDeg(new Date('1995-12-17T06:00:00')) ).toBeCloseTo(90);
    expect( timeToDeg(new Date('1995-12-17T12:00:00')) ).toBeCloseTo(180);
    expect( timeToDeg(new Date('1995-12-17T18:00:00')) ).toBeCloseTo(270);
  });

  it("returns NaN in case of bad values", () => {
    ///@ts-expect-error
    expect( timeToDeg() ).toBe(NaN);
    ///@ts-expect-error
    expect( timeToDeg("asdfsd") ).toBe(NaN);
    expect( timeToDeg(new Date("asdfsd")) ).toBe(NaN);
  });
});