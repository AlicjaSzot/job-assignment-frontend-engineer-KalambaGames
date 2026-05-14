import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "react-query";
import { User, UserResponse } from "../../types";
import { fetchCurrentUser, loginUser, registerUser } from "./authApi";

interface AuthState {
  user: User | null;
  loading: boolean;
}

interface UseLoginResult {
  login: UseMutateFunction<UserResponse, unknown, { email: string; password: string }>;
  isLoading: boolean;
  error: unknown;
}

interface UseRegisterResult {
  register: UseMutateFunction<UserResponse, unknown, { username: string; email: string; password: string }>;
  isLoading: boolean;
  error: unknown;
}

export function useAuth(): AuthState {
  const { data: user = null, isLoading } = useQuery<User | null>("currentUser", fetchCurrentUser, {
    staleTime: 5 * 60 * 1000,
  });

  return { user, loading: isLoading };
}

export function useLogin(): UseLoginResult {
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation<UserResponse, unknown, { email: string; password: string }>(
    ({ email, password }): Promise<UserResponse> => loginUser(email, password),
    {
      onSuccess: (data): void => {
        queryClient.setQueryData<User | null>("currentUser", data.user);
      },
    }
  );

  return { login, isLoading, error };
}

export function useRegister(): UseRegisterResult {
  const queryClient = useQueryClient();
  const {
    mutate: register,
    isLoading,
    error,
  } = useMutation<UserResponse, unknown, { username: string; email: string; password: string }>(
    ({ username, email, password }): Promise<UserResponse> => registerUser(username, email, password),
    {
      onSuccess: (data): void => {
        queryClient.setQueryData<User | null>("currentUser", data.user);
      },
    }
  );

  return { register, isLoading, error };
}
