import API from "@/config/apiClient";

type LoginProps = {
  email: string;
  password: string;
};

type RegisterProps = LoginProps & {
  confirmPassword: string;
};

export const login = async (data: LoginProps) => API.post("/auth/login", data);
export const register = async (data: RegisterProps) =>
  API.post("/auth/register", data);

export const verifyEmail = async (verificationCode: string) =>
  API.get(`/auth/email/verify/${verificationCode}`);

export const sendPasswordResetEmail = async (email: string) =>
  API.post("/auth/password/forgot", { email });

type ResetPasswordParams = {
  password: string;
  verificationCode: string;
};

export const resetPassword = async (data: ResetPasswordParams) =>
  API.post("/auth/password/reset", data);
