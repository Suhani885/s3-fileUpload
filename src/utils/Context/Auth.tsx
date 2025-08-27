import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { Login } from "~/services/api";
import { managerLoginDestroyMutation } from "~/services/api/@tanstack/react-query.gen";

type AuthContext = {
  isAuthenticated: boolean;
  user: Login | undefined | null;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<Login | null | undefined>>;
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

  // const req = async () => {
  //   const data = await managerLoginRetrieve();
  //   if (data.status == 200) {
  //     setUser((prv) => (prv = data.data));
  //     navigate({ to: "/user" });
  //   }
  // };
  // console.log(router.latestLocation.pathname);
  // useEffect(() => {
  //   // if (isAuthenticated && router.latestLocation.pathname == "/login") {
  //   //   navigate({ to: "/user" });
  //   // } else {
  //   //   req();
  //   // }
  // }, [router.latestLocation.pathname]);

  const logoutMutation = useMutation(managerLoginDestroyMutation());

  const logout = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          console.log(data);
          setUser((prv) => (prv = null));
          toast.success("Usser Logout successfull");
          navigate({ to: "/" });
        },
      }
    );
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
