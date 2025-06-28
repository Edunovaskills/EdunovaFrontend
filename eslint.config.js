import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

// Custom error message for import hierarchy
const featureSliceDesignError =
  '⚠ Feature-Slice-Design Error: ' +
  'Stick to the following import hierarchy: app > pages > features > entities > shared'

// Define the ESLint configuration
const config = [
  {
    ignores: ['dist', 'build', 'node_modules'], // Add other paths you want to ignore
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
      import: importPlugin,
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
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'import/no-extraneous-dependencies': 'off', // Customize as needed
    },
  },
  // Additional rules for all file types
  {
    files: ['**/*'], // Catch-all for any file type
    rules: {
      // Removed the import/no-restricted-paths rule as it's not compatible with flat config
    },
  },
]

export default config
