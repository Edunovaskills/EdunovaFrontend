/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: './',
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
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
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
  },
})
