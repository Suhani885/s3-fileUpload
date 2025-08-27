// import { baseURL } from './services/baseUrl';
// import { client } from './services/api/client.gen'
import { client } from "~/services/api/client.gen";
const baseURL = "https://shantanu:8000";

client.setConfig({
  baseURL: baseURL,
  withCredentials: true,
});
