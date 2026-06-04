export const PASSWORD_MIN_LENGTH = 12

export const PASSWORD_COMPLEXITY_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{12,}$/

export const PASSWORD_POLICY_ERROR_MESSAGE =
  'Password must be at least 12 characters long and include uppercase, lowercase, number, and special character.'

export const PASSWORD_POLICY_UI_DESCRIPTION =
  'At least 12 characters with uppercase, lowercase, number, and special character.'

export const validatePasswordComplexity = (password: string): boolean => {
  return PASSWORD_COMPLEXITY_REGEX.test(password)
}
