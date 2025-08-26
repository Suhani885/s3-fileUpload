// import { baseURL } from './services/baseUrl';
// import { client } from './services/api/client.gen'
import { client } from "~/services/api/client.gen";
const baseURL = "https://10.21.99.139:8000";

client.setConfig({
  baseURL: baseURL,
  withCredentials: true,
});
