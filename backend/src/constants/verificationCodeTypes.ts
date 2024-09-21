// enum => when compiled to JS, values are referenced to an object
// const enum => when compiled to JS, values are injected directly
const enum VerificationCodeType {
  EmailVerification = "email_verification",
  PasswordReset = "password_reset",
}

export default VerificationCodeType;
