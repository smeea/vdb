import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import valtio from 'eslint-plugin-valtio';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...react.configs.flat.recommended,
    ...valtio.configs['flat/recommended'],
    plugins: {
      react,
      reactHooks,
      valtio,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'reactHooks/rules-of-hooks': 'error',
      'reactHooks/exhaustive-deps': 'off',
      'valtio/state-snapshot-rule': ['warn'],
      'valtio/avoid-this-in-proxy': ['warn'],
    },
  },
];
