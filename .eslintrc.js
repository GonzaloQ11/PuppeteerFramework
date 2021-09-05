module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
    jquery: true,
  },
  extends: 'airbnb',
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
