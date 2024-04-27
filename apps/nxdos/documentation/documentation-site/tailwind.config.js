const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const { join } = require('path');

const { workspaceRoot } = require('@nrwl/devkit');

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
