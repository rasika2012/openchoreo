import eslintConfig from "../../../eslint.config.base.cjs"
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  ...eslintConfig,
  ...compat.extends('plugin:storybook/recommended'),
  ...compat.extends('plugin:storybook/recommended'),
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '**/*.mjs',
      '**/*.cjs'
    ],
  },
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.rush/**',
      '**/common/temp/**',
      '**/coverage/**',
      '**/.storybook/**',
      '**/storybook-static/**',
      "**.config.js",
      "**.config.cjs"
    ],
  }
]
