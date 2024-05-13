const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join } = require('path');

const { workspaceRoot } = require('@nx/devkit');

module.exports = {
  mode: 'jit',
  presets: [require(workspaceRoot + '/tailwind-workspace-preset.js')],
  content: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
