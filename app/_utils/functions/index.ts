export type passwordStrength =
  | "Undetermined"
  | "Very Weak"
  | "Weak"
  | "Fair"
  | "Good"
  | "Strong"
  | "Very Strong"
  | "Excellent";

const COMMON_PASSWORD_PATTERNS = ["password", "qwerty", "letmein", "welcome", "admin", "login", "iloveyou", "abc", "123", "football", "monkey", "dragon"];
const SEQUENTIAL_PATTERN = /(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|qwerty)/i;

/**
 * Estimates password quality entirely on-device. It never logs, stores, or
 * transmits the password. This is a UX indicator, not breach-password detection.
 */
export const passwordStrengthCheckHelper = (password: string): passwordStrength => {
  if (!password) return "Undetermined";

  const normalized = password.toLowerCase();
  const length = password.length;
  const characterClasses = [/[a-z]/.test(password), /[A-Z]/.test(password), /\d/.test(password), /[^A-Za-z0-9\s]/.test(password)].filter(Boolean).length;
  const uniqueCharacters = new Set(password).size;
  let score = 0;

  // Up to 40 points for length, 50 for complexity, then pattern penalties.
  if (length >= 8) score += 10;
  if (length >= 12) score += 10;
  if (length >= 16) score += 10;
  if (length >= 20) score += 10;
  score += characterClasses * 10;
  if (uniqueCharacters >= Math.min(10, length)) score += 10;
  if (characterClasses === 4 && length >= 12) score += 10;

  const repeatedCharacter = /(.)\1{2,}/.test(password);
  const repeatedBlock = /^(.{1,4})\1+$/.test(password);
  const commonPattern = COMMON_PASSWORD_PATTERNS.some((pattern) => normalized.includes(pattern));
  const sequential = SEQUENTIAL_PATTERN.test(normalized) || SEQUENTIAL_PATTERN.test([...normalized].reverse().join(""));

  if (length < 8) score -= 35;
  if (characterClasses === 1) score -= 20;
  if (repeatedCharacter) score -= 20;
  if (repeatedBlock) score -= 25;
  if (commonPattern) score -= 30;
  if (sequential) score -= 15;
  if (/\s/.test(password)) score -= 5;

  score = Math.max(0, Math.min(100, score));
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Very Strong";
  if (score >= 60) return "Strong";
  if (score >= 45) return "Good";
  if (score >= 30) return "Fair";
  if (score >= 15) return "Weak";
  return "Very Weak";
};

export const passwordGenerator = (length: number, hasNumbers?: boolean, hasSymbols?: boolean): string => {
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = upperCaseChars.toLowerCase();
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*(),.?\":{}|<>+-=/\\[\\]_`~;";
  const safeLength = Math.max(8, Math.min(128, Math.floor(length)));
  const passwordMaterial = upperCaseChars + lowerCaseChars + (hasNumbers ? numberChars : "") + (hasSymbols ? symbolChars : "");

  const randomCharacter = () => {
    const value = new Uint32Array(1);
    crypto.getRandomValues(value);
    return passwordMaterial.charAt(value[0] % passwordMaterial.length);
  };
  const generate = () => Array.from({ length: safeLength }, randomCharacter).join("");
  const isValid = (value: string) => /[A-Z]/.test(value) && /[a-z]/.test(value) && (!hasNumbers || /\d/.test(value)) && (!hasSymbols || /[^A-Za-z0-9\s]/.test(value));

  let generated = generate();
  while (!isValid(generated)) generated = generate();
  return generated;
};
