// import { baseURL } from './services/baseUrl';
// import { client } from './services/api/client.gen'
import { client } from "~/services/api/client.gen";
const baseURL = "http://100.74.154.19:8001/";

client.setConfig({
  baseURL: baseURL,
  withCredentials: true,
});
