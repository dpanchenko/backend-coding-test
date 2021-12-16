module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  plugins: [
    'mocha',
  ],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {},
  },
  rules: {
    'consistent-return': 0,
    'no-shadow': 0,
    'global-require': 0,
  },
};
