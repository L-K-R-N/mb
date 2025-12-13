// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import prettierPlugin from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
   [
      globalIgnores(["dist"]),
      {
         files: ["**/*.{ts,tsx}"],
         extends: [
            // js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs["recommended-latest"],
            reactRefresh.configs.vite,
         ],
         plugins: {
            prettier: prettierPlugin,
            // "simple-import-sort": simpleImportSort,
         },
         languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
         },
         rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "simple-import-sort/imports": "warn",
            "simple-import-sort/exports": "warn",
         },
      },
   ],
   storybook.configs["flat/recommended"],
);
