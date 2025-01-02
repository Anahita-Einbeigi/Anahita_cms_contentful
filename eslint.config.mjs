import pluginReact from 'eslint-plugin-react';
import pluginNext from 'eslint-plugin-next';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        react: 'readonly',
      },
    },
    plugins: {
      react: pluginReact,
      next: pluginNext,
    },
    extends: ['plugin:react/recommended', 'plugin:next/recommended','next/core-web-vitals' ],
    rules: {
    },
  },
];
