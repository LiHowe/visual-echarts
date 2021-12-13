module.exports = {
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:vue/essential",
      "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
      "ecmaVersion": 13,
      "parser": "@typescript-eslint/parser",
      "sourceType": "module"
  },
  "plugins": [
      "vue",
      "@typescript-eslint"
  ],
  "rules": {
    quotes: [2, 'single'],
    semi: [2, 'never'],
    "object-curly-spacing": [2, 'always']
  },
  ignorePatterns: [
    '.eslintrc.*'
  ]
};
