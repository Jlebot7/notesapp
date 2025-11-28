import axiosInstance from "../utils/AxiosInstance";
import { User } from "../types/User";

const fetchUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get("/users");
  return res.data || [];
};

const fetchUserById = async (id: number): Promise<User | null> => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data || null;
};

const createUser = async (user: Partial<User>): Promise<User> => {
  const res = await axiosInstance.post("/users/signup", user);
  return res.data;
};

const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const res = await axiosInstance.put(`/users/${id}`, user);
  return res.data;
};

export { fetchUsers, fetchUserById, createUser, updateUser };
