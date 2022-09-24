// User interface
export interface User {
  id: number;
  email: string;
  password: string;
}

// User data when creating the user (no id column)
export type UserToCreate = Omit<User, "id">;

// User data when getting the user data from backend (no password column)
export type UserToGet = Omit<User, "password">;
