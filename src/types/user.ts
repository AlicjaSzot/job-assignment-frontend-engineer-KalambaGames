export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserResponse {
  user: User;
}

export interface UpdateUser {
  email?: string;
  token?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export interface UpdateUserRequest {
  user: UpdateUser;
}
