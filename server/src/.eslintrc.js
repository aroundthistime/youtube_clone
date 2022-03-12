module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'object-curly-spacing': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        mjs: 'never',
      },
    ],
    'import/no-unresolved': 'off',
  },
  settings: {
    'import/resolver': {node: {extensions: ['.js', '.jsx', '.ts', '.tsx']}},
  },
};
