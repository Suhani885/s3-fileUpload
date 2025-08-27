import { QueryClient } from "@tanstack/react-query";
import { Login } from "~/services/api";

export type MyRouterContext = {
  queryClient: QueryClient;
  isAuthenticated: boolean;
  user: Login | null;
};
