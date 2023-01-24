const IGNORE = 0;
const WARNING = 1;
const ERROR = 2;

const IS_PROD = process.env.NODE_ENV === "production";

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ["@typescript-eslint", "jsx-a11y", "react", "react-hooks", "prettier"],
  extends: [
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:storybook/recommended",
  ],
  rules: {
    "react/no-unknown-property": [ERROR, { ignore: ["css"] }],
    "react/display-name": IGNORE,
    "react/jsx-uses-react": IGNORE,
    "react/react-in-jsx-scope": IGNORE,
    "import/no-named-as-default": IGNORE,
    "import/order": ERROR,
    "import/no-extraneous-dependencies": [
      ERROR,
      {
        devDependencies: true,
      },
    ],
    "import/no-unresolved": IGNORE,
    // @TYPESCRIPTS
    "@typescript-eslint/consistent-type-imports": ERROR,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ERROR,
    // Consider enabeling ignored rules?
    "@typescript-eslint/no-explicit-any": IGNORE,
    "@typescript-eslint/explicit-function-return-type": IGNORE,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ERROR,
    "@typescript-eslint/no-empty-function": IGNORE,
    "no-shadow": IGNORE,
    "@typescript-eslint/no-shadow": ERROR,
    // Eslint standard rules
    "no-console": IS_PROD ? ERROR : IGNORE,
    "@typescript-eslint/explicit-module-boundary-types": IS_PROD ? ERROR : WARNING,
    "no-useless-computed-key": WARNING,
    "no-empty-pattern": WARNING,
    "comma-dangle": [ERROR, "always-multiline"],
    "no-param-reassign": ERROR,
    // Can lead to nasty bugs if we allow this.
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        tabWidth: 2,
        trailingComma: "es5",
        quoteProps: "consistent",
        endOfLine: "lf",
        arrowParens: "avoid",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.d.ts"],
      rules: {
        "@typescript-eslint/camelcase": IGNORE,
        "@typescript-eslint/ban-ts-comment": IGNORE,
        "@typescript-eslint/explicit-module-boundary-types": IGNORE,
        "react-hooks/exhaustive-deps": IGNORE,
      },
    },
    {
      files: ["**/*.tsx"],
      rules: {
        // We are using TS so no need to check for prop-types
        "react/prop-types": IGNORE,
        "react/no-array-index-key": IGNORE,
        "react/jsx-filename-extension": [
          ERROR,
          {
            extensions: [".tsx"],
          },
        ],
        "react-hooks/rules-of-hooks": ERROR,
        "react-hooks/exhaustive-deps": WARNING,
        "react/no-unescaped-entities": IGNORE,
        "react/jsx-one-expression-per-line": IGNORE, // This rule colides with prettier. So ignore it
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
