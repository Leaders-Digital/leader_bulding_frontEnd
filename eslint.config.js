import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// Get base configs
const jsConfig = js.configs.recommended;
const reactConfig = react.configs.recommended;
const reactJsxConfig = react.configs["jsx-runtime"];
const reactHooksConfig = reactHooks.configs.recommended;

// Override rules to disable prop-types checking
const overrideRules = {
  ...jsConfig.rules,
  ...reactConfig.rules,
  ...reactJsxConfig.rules,
  ...reactHooksConfig.rules,
  "react/prop-types": 0,
  "react/require-default-props": 0,
  "react/no-unused-prop-types": 0,
  "react/jsx-no-target-blank": 0,
  "react-refresh/only-export-components": [
    "warn",
    { allowConstantExport: true },
  ],
};

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.vscode/**",
      "**/coverage/**",
      "vite.config.js",
    ],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "18.3",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: overrideRules,
  },
];
