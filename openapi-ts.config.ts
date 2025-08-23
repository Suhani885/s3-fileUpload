const baseURL = 'http://10.21.98.201:8000'
import { defineConfig } from '@hey-api/openapi-ts';
export default defineConfig({
    input: `${baseURL}/schema`,
    output: 'src/services/api',
    plugins: [
        '@tanstack/react-query',
        '@hey-api/client-axios'
    ],
});