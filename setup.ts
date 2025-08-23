// import { baseURL } from './services/baseUrl';
// import { client } from './services/api/client.gen'
import { client } from '~/services/api/client.gen';
const baseURL = "https://10.21.98.201:8888"

client.setConfig({
    baseURL: baseURL,
    withCredentials: true,
});

