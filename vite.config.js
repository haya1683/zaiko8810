import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/zaiko8810/', // ← この行を追加
  plugins: [react()],
})