import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createContext, useCallback, useState } from "react";
import { Login } from "~/services/api";
import { managerLoginRetrieveOptions } from "~/services/api/@tanstack/react-query.gen";

type AuthContext = {
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  user: Login | null;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Login | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = !!user;
  const { data, status, isSuccess } = useQuery({
    ...managerLoginRetrieveOptions(),
  });
  if (isSuccess) {
    setUser((prv) => (prv = data));
  } else {
    navigate({ to: "/" });
  }

  const logout = useCallback(async () => {}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
