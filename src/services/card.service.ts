/**
 * Validates a credit card number using the Luhn algorithm.
 * @param cardNumber The credit card number to validate.
 * @returns True if the card number is valid, false otherwise.
 */
export function validateCardNumber(cardNumber: string): boolean {
  // Remove any whitespace characters (spaces, tabs, newlines)
  const sanitized = cardNumber.replace(/\s+/g, "");

  // Check if the sanitized string contains only digits and has a valid length (13-19 digits)
  if (!/^\d+$/.test(sanitized)) return false;
  if (sanitized.length < 13 || sanitized.length > 19) return false;

  // Luhn algorithm implementation
  let sum = 0;
  let shouldDouble = false;

  // Iterate over the digits in reverse order
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;

    // Toggle the flag for the next iteration
    shouldDouble = !shouldDouble;
  }

  // The card number is valid if the sum is a multiple of 10
  return sum % 10 === 0;
}
