import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    dedupe: ['react', 'react-dom'], // ✅ prevents double React
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-is': path.resolve(__dirname, 'node_modules/react-is'),
    },
  },
  build: {
    outDir: 'build',
  },
})
