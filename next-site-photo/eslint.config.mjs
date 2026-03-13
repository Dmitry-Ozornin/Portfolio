import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";

// Импортируем TypeScript плагины
let typescriptEslint = {};
let tsParser = {};

try {
  typescriptEslint = (await import("@typescript-eslint/eslint-plugin")).default;
  tsParser = (await import("@typescript-eslint/parser")).default;
} catch (error) {
  console.warn("TypeScript ESLint plugins not found. Run: npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin");
}

export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Next.js правила
      "@next/next/google-font-display": "warn",
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-img-element": "warn",

      // TypeScript правила (будут работать только если плагины загружены)
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"]),
]);
