module.exports = {
  root: true,
  extends: [
    // "eslint:recommended",
    // "plugin:node/recommended",
    // "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  ignorePatterns: ["public/**/*"],
  overrides: [
    {
      files: ["*.mdx", "*.md"],
      extends: "plugin:mdx/recommended",
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["import"],
  rules: {
    "@typescript-eslint/no-var-requires": 0,
    "node/no-unpublished-require": 0,
    "node/no-missing-import": "off",
    "node/no-unpublished-import": "off",
    "node/no-unsupported-features/es-syntax": "off",
  },
};
