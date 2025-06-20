import eslintConfig from "../../../eslint.config.base.cjs";

export default [
  ...eslintConfig,
  {
    ignores: [
      "dist/**",
      "public/**",
      "node_modules/**",
      "coverage/**",
      ".storybook/**",
      "babel.config.cjs",
      "src/Icons/**",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.stories.ts",
    ],
  },
];
