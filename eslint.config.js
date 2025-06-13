import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// Custom error message for import hierarchy
const featureSliceDesignError =
  '⚠ Feature-Slice-Design Error: ' +
  'Stick to the following import hierarchy: app > pages > features > entities > shared';

// Define the ESLint configuration
const config = [
  {
    ignores: ['dist'], // Add other paths you want to ignore
  },
  {
    // Base configuration for JavaScript files
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Configuration specifically for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'import/no-extraneous-dependencies': 'off', // Customize as needed
      // Add other rules for TypeScript files here
    },
  },
  // Additional rules for all file types
  {
    files: ['**/*'], // Catch-all for any file type
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          basePath: './src',
          zones: [
            {
              target: './pages',
              from: ['./app'],
              message: featureSliceDesignError,
            },
            {
              target: './features',
              from: ['./pages', './app'],
              message: featureSliceDesignError,
            },
            {
              target: './entities',
              from: ['./features', './pages', './app'],
              message: featureSliceDesignError,
            },
            {
              target: './shared',
              from: ['./features', './entities', './pages', './app'],
              message: featureSliceDesignError,
            },
          ],
        },
      ],
    },
  },
];

export default config;
