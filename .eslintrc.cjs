import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import'; // Import the plugin

// Define the ESLint configuration
const config = [
  // Ignored files and directories
  { ignores: ['dist'] },
  
  // Main ESLint configuration
  {
    // Specify the files to lint
    files: ['**/*.{ts,tsx,js,jsx}'],
    
    // Extend recommended configurations
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    
    // Specify language options
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
    },
    
    // Specify plugins
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin, // Add the import plugin here
    },
    
    // Specify rules
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/no-explicit-any': 'error', // no any type
      '@typescript-eslint/no-shadow': 'off', // same name for different variables
      'react/require-default-props': 'off', // default value for optional props is required
      'react/jsx-props-no-spreading': 'off', // allow props spreading
      '@typescript-eslint/no-unnecessary-condition': 'error',
      'import/no-extraneous-dependencies': 'off',

      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/semi': ['error', 'never'],
      '@typescript-eslint/no-redeclare': [
        'error',
        { ignoreDeclarationMerge: true },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': true,
          'ts-check': false,
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          // prefix: ['I'],
        },
        {
          selector: 'enum',
          format: ['UPPER_CASE'],
          // suffix: ['Types'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
      ],

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'shared/**', group: 'internal', position: 'before' },
            { pattern: 'entities/**', group: 'internal', position: 'before' },
            { pattern: 'features/**', group: 'internal', position: 'before' },
            { pattern: 'pages/**', group: 'internal', position: 'before' },
            { pattern: 'app/**', group: 'internal', position: 'before' },
          ],
          distinctGroup: true,
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],

      'import/no-restricted-paths': [
        'error',
        {
          basePath: './src',
          zones: [
            {
              target: './pages',
              from: ['./app'],
              message: 'Feature slice design error', // Change this to your desired message
            },
            {
              target: './features',
              from: ['./pages', './app'],
              message: 'Feature slice design error', // Change this to your desired message
            },
            {
              target: './entities',
              from: ['./features', './pages', './app'],
              message: 'Feature slice design error', // Change this to your desired message
            },
            {
              target: './shared',
              from: ['./features', 'entities', './pages', './app'],
              message: 'Feature slice design error', // Change this to your desired message
            },
          ],
        },
      ],

      complexity: ['warn', 12],
      'no-void': 'off',
      'max-params': ['error', 3], // Setting max params to function
      'max-len': 'off', // Disable max length rule
    },
  },
];

export default config; // Export the configuration
