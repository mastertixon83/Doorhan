/**
 * Utility for formatting Kazakhstan/CIS phone numbers in the format:
 * +7 (XXX) XXX-XX-XX
 */

export function formatKazakhstanPhone(value: string): string {
  // Strip all non-digit characters
  let digits = value.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  // If starts with 8, replace with 7 for Kazakhstan/CIS standard
  if (digits.startsWith('8')) {
    digits = '7' + digits.slice(1);
  } else if (!digits.startsWith('7')) {
    digits = '7' + digits;
  }

  // Limit to 11 digits (7 + 10 local digits)
  digits = digits.slice(0, 11);

  // Build formatted string
  let formatted = '+7';

  if (digits.length > 1) {
    formatted += ' (' + digits.slice(1, 4);
  }
  if (digits.length >= 4) {
    formatted += ') ';
  }
  if (digits.length >= 5) {
    formatted += digits.slice(4, 7);
  }
  if (digits.length >= 7) {
    formatted += '-' + digits.slice(7, 9);
  }
  if (digits.length >= 9) {
    formatted += '-' + digits.slice(9, 11);
  }

  return formatted;
}

export function isValidKazakhstanPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  // Valid if starts with 7 and has exactly 11 digits
  return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'));
}
