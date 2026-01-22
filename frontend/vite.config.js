import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import jsconfigPaths from 'vite-jsconfig-paths'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()], // Add tsconfigPaths() here
  resolve: {
    alias: {
      // Maps '@' to the 'src' directory inside your project
      '@': path.resolve(__dirname, './src'),
    },
  },
})
