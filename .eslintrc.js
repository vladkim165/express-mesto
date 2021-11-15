module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "airbnb-base",
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 13,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "eslint no-underscore-dangle": ["error", { "allow": ["_id"] }]
  }
};
