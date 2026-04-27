import { validateCardNumber } from "../src/services/card.service.js";

describe("validateCardNumber", () => {
  it("returns true for a valid Visa test number", () => {
    expect(validateCardNumber("4111111111111111")).toBe(true);
  });

  it("returns true with spaces in the input", () => {
    expect(validateCardNumber("4111 1111 1111 1111")).toBe(true);
  });

  it("returns false for an invalid card number", () => {
    expect(validateCardNumber("1234567890123456")).toBe(false);
  });

  it("returns false for non-numeric input", () => {
    expect(validateCardNumber("abcd-efgh-ijkl")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(validateCardNumber("")).toBe(false);
  });

  it("returns false for a number that is too short", () => {
    expect(validateCardNumber("411111")).toBe(false);
  });
});
