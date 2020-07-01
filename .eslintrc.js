module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "eslint:recommended",
    "react-app",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:import/typescript",
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ["react", "import"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "unknown",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    "@typescript-eslint/explicit-member-accessibility": 0,
    "no-console": 0,
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/camelcase": [
      "error",
      { properties: "never", ignoreDestructuring: true },
    ],
    "require-atomic-updates": 0,
    "import/no-cycle": ["error", { maxDepth: 3 }],
    "no-process-env": "error",
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
};
