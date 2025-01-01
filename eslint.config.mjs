import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  extends: [
    "eslint:recommended", 
    "plugin:react/recommended", 
    "plugin:@next/next/recommended", 
  ],
  parserOptions: {
    ecmaVersion: 2020, 
    sourceType: "module", 
  },
  settings: {
    react: {
      version: "detect", 
    },
  },
  rules: {
    "no-unused-vars": "warn", 
  },
};
