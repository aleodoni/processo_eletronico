module.exports = {
    env: {
      es6: true,
      jest: true,
      browser: true
    },
    extends: ["airbnb", "prettier", "prettier/react"],
    globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
    },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2018,
      sourceType: "module"
    },
    plugins: ["react", "jsx-a11y", "import", "react-hooks", "prettier"],
    rules: {
      "prettier/prettier": "error",
      "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "react/jsx-one-expression-per-line": "off",
      "global-require": "off",
      "react-native/no-raw-text": "off",
      "no-param-reassign": "off",
      "no-underscore-dangle": "off",
      camelcase: "off",
      "no-console": ["off", { allow: ["tron"] }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-props-no-spreading": ["off"],
      "no-plusplus": "off",
      "import/prefer-default-export": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/no-autofocus": "off",
      "react/destructuring-assignment": [
        "error",
        "always",
        {
          "ignoreClassFields": true
        }
      ],
      "prefer-destructuring": ["error", {"object": true, "array": false}],
      "no-useless-escape": "error"
    }
  };
