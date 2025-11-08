// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// const shortlink = require('eslint-config-shortlink')

export default [// ...shortlink,
{
  ignores: ['.*', 'node_modules', 'dist', 'storybook-static'],
}, ...storybook.configs["flat/recommended"]];
