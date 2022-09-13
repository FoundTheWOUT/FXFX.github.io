module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:@typescript-eslint/recommended",
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
    // "node/no-missing-import": [
    //   "error",
    //   {
    //     allowModules: ["types", "estree", "less", "sass", "stylus"],
    //     tryExtensions: [".ts", ".js", ".jsx", ".tsx", ".d.ts"],
    //   },
    // ],
  },
};
