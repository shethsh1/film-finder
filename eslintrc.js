module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'airbnb',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
      'prettier/react',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  };