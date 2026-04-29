import { validateCardNumber } from "../src/services/card.service.js";

/**
 * Unit Test Suite for Card Validation Service.
 * Tests both the mathematical accuracy of the Luhn algorithm implementation
 * and structural validations like length, spacing, and invalid characters.
 */
describe("validateCardNumber", () => {
  // --- Happy Path Tests ---
  it("returns true for a valid Visa test number", () => {
    // Tests the standard 16-digit Luhn scenario
    expect(validateCardNumber("4111111111111111")).toBe(true);
  });

  it("returns true with spaces in the input", () => {
    // Tests that whitespace sanitization logic works correctly before validation
    expect(validateCardNumber("4111 1111 1111 1111")).toBe(true);
  });

  // --- Negative/Edge Case Tests ---
  it("returns false for an invalid card number", () => {
    // Tests a purely invalid number that fails the modulo 10 checksum
    expect(validateCardNumber("1234567890123456")).toBe(false);
  });

  it("returns false for non-numeric input", () => {
    // Tests that alphabetic or special characters are safely rejected
    expect(validateCardNumber("abcd-efgh-ijkl")).toBe(false);
  });

  it("returns false for an empty string", () => {
    // Tests boundary condition of an empty payload
    expect(validateCardNumber("")).toBe(false);
  });

  it("returns false for a number that is too short", () => {
    // Tests the minimum length constraint (13 digits)
    expect(validateCardNumber("411111")).toBe(false);
  });
});
