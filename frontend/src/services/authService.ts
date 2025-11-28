import axiosInstance from "../utils/AxiosInstance";

interface AuthResponse {
  access_token: string;
}

const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/login", { username, password });
  return res.data;
};

const fetchUserProfile = async () => {
  const res = await axiosInstance.get("/auth/profile");
  return res.data;
};

export { login, fetchUserProfile };
