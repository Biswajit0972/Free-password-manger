export type passwordStrength = "Very Weak" | "Weak" | "Medium" | "Fair" | "Good" | "Very Strong" | "Excellent 💪" | "Undetermined" | "Very Weak (Too short)" | "";

export const passwordStrengthCheckHelper = (password: string): string | passwordStrength=> {
  const length = password.length;
  let score = 0;

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>+\-=/\\[\]_`~;]/.test(password);
  const hasMiddleChar = /(?=\S*[\d!@#$%^&*(),.?":{}|<>+\-=/\\[\]_`~;])/.test(password.slice(1, -1));
  const onlyLetters = /^[a-zA-Z]+$/.test(password);
  const onlyNumbers = /^\d+$/.test(password);
  
  // Length
  if (length >= 8) score += 10;
  if (length >= 12) score += 10;
  if (length >= 16) score += 10;

  // Character Variety
  if (hasLower) score += 10;
  if (hasUpper) score += 10;
  if (hasNumber) score += 10;
  if (hasSymbol) score += 15;
  if (hasMiddleChar) score += 5;

  // Bonus for combo
  if (hasLower && hasUpper && hasNumber && hasSymbol) score += 10;

  // Penalties
  if (onlyLetters || onlyNumbers) score -= 10;
  if (length < 6) score -= 15;

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(score, 100));

  if (score >= 90) return "Excellent";
  if (score >= 80 && score < 90) return "Very Strong";
  if (score >= 70 && score < 80) return "Strong";
  if (score >= 60 && score < 70) return "Good";
  if (score >= 50 && score < 60) return "Fair";
  if (score >= 30) return "Weak";
  return "Very Weak";
};

export const passwordGenerator = (
  length: number,
  hasNumbers?: boolean,
  hasSymbols?: boolean
): string => {
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = upperCaseChars.toLowerCase();
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*(),.?\":{}|<>+-=/\\[\\]_`~;";

  let passwordMaterial = upperCaseChars + lowerCaseChars;
  if (hasNumbers) passwordMaterial += numberChars;
  if (hasSymbols) passwordMaterial += symbolChars;
  if (hasSymbols && hasNumbers) passwordMaterial += symbolChars + numberChars;

  
  const generate = (): string => {
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * passwordMaterial.length);
      password += passwordMaterial.charAt(randomIndex);
    }
    return password;
  };

  // Helper to validate generated password
  const isValid = (password: string): boolean => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNum = hasNumbers ? /\d/.test(password) : true;
    const hasSym = hasSymbols ? /[!@#$%^&*(),.?":{}|<>+\-=/\\[\]_`~;]/.test(password) : true;

    return hasUpper && hasLower && hasNum && hasSym;
  };

  // Generate until valid
  let generatedPassword = generate();
  while (!isValid(generatedPassword)) {
    generatedPassword = generate();
    console.log("Generated Password:", generatedPassword, "valid:", isValid(generatedPassword));
  }
  return generatedPassword;
};
