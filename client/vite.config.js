import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://writeapii-bedsc0afgfb8dyh7.westus-01.azurewebsites.net',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
