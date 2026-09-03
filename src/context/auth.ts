import { createContext, useContext } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  accessToken?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  setLoginedUser: (user: AuthUser) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
