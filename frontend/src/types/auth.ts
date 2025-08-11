export type UserRole = "admin" | "user";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
};
