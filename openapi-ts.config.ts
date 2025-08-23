const baseURL = 'http://localhost:8000'
import { defineConfig } from '@hey-api/openapi-ts';
export default defineConfig({
    input: `${baseURL}/openapi.yaml`,
    output: 'src/services/api',
    plugins: [
        '@tanstack/react-query',
        '@hey-api/client-axios'
    ],
});