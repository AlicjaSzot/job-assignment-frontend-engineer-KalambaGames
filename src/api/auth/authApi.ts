import apiClient, { setToken, removeToken, getToken } from "../apiClient";
import { UserResponse, UpdateUserRequest, User } from "../../types";

// Auth

export const loginUser = async (email: string, password: string): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>("/users/login", {
    user: { email, password },
  });
  setToken(response.data.user.token);
  return response.data;
};

export const registerUser = async (username: string, email: string, password: string): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>("/users", {
    user: { username, email, password },
  });
  setToken(response.data.user.token);
  return response.data;
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>("/user");
  return response.data;
};

export const updateCurrentUser = async (data: UpdateUserRequest): Promise<UserResponse> => {
  const response = await apiClient.put<UserResponse>("/user", data);
  return response.data;
};

export const logoutUser = (): void => {
  removeToken();
};

// Fetch current user only if a token exists
export const fetchCurrentUser = async (): Promise<User | null> => {
  const token = getToken();
  if (!token) return null;
  const res = await getCurrentUser();
  return res.user;
};
