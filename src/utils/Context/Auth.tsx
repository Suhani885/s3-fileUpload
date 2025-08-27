import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Login, LoginRequest, managerLoginRetrieve } from "~/services/api";
import {
  managerLoginCreateMutation,
  managerLoginDestroyMutation,
} from "~/services/api/@tanstack/react-query.gen";

type AuthContext = {
  isAuthenticated: boolean;
  user: Login | undefined | null;
  logout: () => void;
  login: (loc: any, token: any) => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Login | null>();
  const navigate = useNavigate();
  const router = useRouter();
  const isAuthenticated = !!user;

  const req = async () => {
    const data = await managerLoginRetrieve();
    if (data.status == 200) {
      setUser((prv) => (prv = data.data));
      navigate({ to: "/user" });
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/user" });
    } else {
      req();
    }
  }, [router.latestLocation.pathname, isAuthenticated]);

  const loginmutation = useMutation(managerLoginCreateMutation());

  const login = (loc: LoginRequest, token: string) => {
    loginmutation.mutate(
      {
        body: loc,
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate({ to: "/user" });
        },
        onError: (data) => {
          toast.error(data.message);
        },
      }
    );
  };

  const logoutMutation = useMutation(managerLoginDestroyMutation());

  const logout = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          console.log(data);
          setUser((prv) => (prv = null));
          toast.success("Usser Logout successfull");
        },
      }
    );
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
