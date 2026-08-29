// @vitest-environment node

import { describe, expect, test } from "vitest";

import { formatDate } from "../lib/formatDate";

describe("formatDate", () => {
  test("formats dates in the app display format", () => {
    expect(formatDate("2026-08-20T12:00:00.000Z")).toBe("20 Aug 2026");
  });



  test("should throw if no string provied to function",()=>{
    
    expect(()=>formatDate('')).toThrow('please provide an date')
  })
});
  