import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import jsconfigPaths from 'vite-jsconfig-paths'

import { fileURLToPath } from 'url'; // Required to define __dirname

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()], // Add tsconfigPaths() here
  server: {
    proxy: {
      '/api': {target: 'http://localhost:5000', changeOrigin: true,}, // Proxy API requests to the backend server
    },
  },
  resolve: {
    alias: {
      // Maps '@' to the 'src' directory inside your project
      '@': path.resolve(__dirname, './src'),
    },
  },
})
