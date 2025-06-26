import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

const config = [
  // Ignored files and directories
  { ignores: ['dist'] },

  // Main ESLint configuration
  {
    files: ['**/*.{ts,tsx,js,jsx}'],

    // Extend recommended configurations
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked, // ✅ Required for full type-aware linting
    ],

    // Language and parser configuration
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser },
      parser: tseslint.parser, // ✅ Required for TS + type-aware rules
      parserOptions: {
        project: './tsconfig.json', // ✅ Needed for rules like no-floating-promises
        sourceType: 'module',
      },
    },

    // Plugins
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      '@typescript-eslint': tseslint.plugin, // ✅ Register TS plugin
    },

    // Rules
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-shadow': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/semi': ['error', 'never'],
      '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
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
        { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'interface', format: ['PascalCase'] },
        { selector: 'enum', format: ['UPPER_CASE'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
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
              message: 'Feature slice design error',
            },
            {
              target: './features',
              from: ['./pages', './app'],
              message: 'Feature slice design error',
            },
            {
              target: './entities',
              from: ['./features', './pages', './app'],
              message: 'Feature slice design error',
            },
            {
              target: './shared',
              from: ['./features', 'entities', './pages', './app'],
              message: 'Feature slice design error',
            },
          ],
        },
      ],
      complexity: ['warn', 12],
      'no-void': 'off',
      'max-params': ['error', 3],
      'max-len': 'off',
    },
  },
];

export default config;
