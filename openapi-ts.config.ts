const baseURL = "http://100.74.154.19:8001/";
import { defineConfig } from "@hey-api/openapi-ts";
export default defineConfig({
  input: `${baseURL}/schema/`,
  output: "src/services/api",
  plugins: ["@tanstack/react-query", "@hey-api/client-axios"],
});
