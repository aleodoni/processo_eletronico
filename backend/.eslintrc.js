module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: [
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "indent": ["error", 4],
    //"comma-dangle": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "camelcase": "off",
    "semi": [2, "always"],
  }
}
