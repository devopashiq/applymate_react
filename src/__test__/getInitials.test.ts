

import { describe, expect, it } from "vitest";

import { getInitials } from "../lib/getInitials";

describe("getInitials", () => {
  it("returns one initial for a single-word name", () => {
    expect(getInitials("applymate")).toBe("A");
  });

  it("returns first and last initials for multi-word names", () => {
    expect(getInitials("Jane Quincy Public")).toBe("JP");
  });

  it("ignores extra whitespace", () => {
    expect(getInitials("  Ada   Lovelace  ")).toBe("AL");
  });

  it("returns an empty string for blank input", () => {
    expect(getInitials("   ")).toBe("");
  });
});
