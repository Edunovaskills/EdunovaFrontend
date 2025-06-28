/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/',
  publicDir: 'public',
  plugins: [react(), tsconfigPaths(), svgr()],
  server: {
    open: true,
    port: 3000,
  },

  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@mui/system',
      '@emotion/react',
      '@emotion/styled',
      'swiper/modules',
      'prop-types',
    ],
    exclude: ['mui-one-time-password-input'],
  },

  resolve: {
    dedupe: ['react', 'react-dom', 'react-is'], // 🧠 ensures no duplicate React
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react-is': path.resolve(__dirname, './node_modules/react-is'),

      '@': path.resolve(__dirname, './src'),
      entities: path.resolve(__dirname, './src/entities'),
      features: path.resolve(__dirname, './src/features'),
      shared: path.resolve(__dirname, './src/shared'),
      pages: path.resolve(__dirname, './src/pages'),
      app: path.resolve(__dirname, './src/app'),
      'prop-types': 'prop-types',
      '@mui/system': '@mui/system',
    },
  },

  build: {
    outDir: 'build',
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('@mui')) return 'mui'
            if (id.includes('react') || id.includes('react-dom')) return 'vendor'
            if (id.includes('react-router')) return 'router'
            if (id.includes('@tanstack')) return 'query'
            if (id.includes('swiper')) return 'swiper'
            return 'vendor'
          }
          if (id.includes('/entities/')) return 'entities'
          if (id.includes('/features/')) return 'features'
          if (id.includes('/pages/')) return 'pages'
          if (id.includes('/shared/')) return 'shared'
          return 'app'
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
