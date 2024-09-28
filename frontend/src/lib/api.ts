import API from "@/config/apiClient";

type LoginProps = {
  email: string;
  password: string;
};

export const login = async (data: LoginProps) => API.post("/auth/login", data);
