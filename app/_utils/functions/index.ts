export type passwordStrength = "Very Weak" | "Weak" | "Medium" | "Fair" | "Good" | "Very Strong" | "Excellent 💪" | "Undetermined" | "Very Weak (Too short)" | "";

export const passwordStrengthCheckHelper = (password: string): string | passwordStrength=> {
  const length = password.length;
  let hasNumbers = false;
  let hasSymbols = false;
  let hasUppercase = false;
  let hasLowercase = false;

  for (let i = 0; i < length; i++) {
    const char = password.charAt(i);
    hasNumbers ||= /\d/.test(char);
    hasSymbols ||= /[!@#$%^&*(),.?":{}|<>+\-=/\\[\]_`~;]/.test(char); // Extended symbols
    hasUppercase ||= /[A-Z]/.test(char);
    hasLowercase ||= /[a-z]/.test(char);
  }

  // Most secure at the top
  if (hasLowercase && hasUppercase && hasNumbers && hasSymbols && length >= 16) {
    return "Excellent";
  }

  if (hasLowercase && hasUppercase && hasNumbers && hasSymbols && length >= 12) {
    return "Very Strong";
  }

  if (hasLowercase && hasUppercase && hasNumbers && hasSymbols && length >= 10) {
    return "Good";
  }

  if (hasLowercase && hasUppercase && hasNumbers && length >= 10) {
    return "Fair";
  }

  if ((hasLowercase || hasUppercase) && (hasNumbers || hasSymbols) && length >= 8) {
    return "Weak";
  }

  if ((hasLowercase || hasUppercase) && length >= 6) {
    return "Very Weak";
  }

  return "Very Weak (Too Short)";
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
