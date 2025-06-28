/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: '/',
  publicDir: 'public',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    svgr({ include: '**/*.svg?react' }),
  ],
  server: {
    open: true, // automatically open the app in the browser
    port: 3000,
  },
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip',
      '@mui/material',
      '@mui/icons-material',
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'swiper/react',
      'swiper/modules',
    ],
  },

  resolve: {
    alias: {
      entities: path.resolve(__dirname, './src/entities'),
      shared: path.resolve(__dirname, './src/shared'),
      features: path.resolve(__dirname, './src/features'),
      pages: path.resolve(__dirname, './src/pages'),
      app: path.resolve(__dirname, './src/app'),
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
          // Handle circular dependencies by grouping related modules
          if (id.includes('node_modules')) {
            if (id.includes('@mui')) {
              return 'mui'
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor'
            }
            if (id.includes('react-router')) {
              return 'router'
            }
            if (id.includes('@tanstack')) {
              return 'query'
            }
            if (id.includes('swiper')) {
              return 'swiper'
            }
            return 'vendor'
          }
          // Group source code by feature areas to avoid circular dependencies
          if (id.includes('/entities/')) {
            return 'entities'
          }
          if (id.includes('/features/')) {
            return 'features'
          }
          if (id.includes('/pages/')) {
            return 'pages'
          }
          if (id.includes('/shared/')) {
            return 'shared'
          }
          return 'app'
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
