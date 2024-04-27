import { workspaceRoot } from '@nx/devkit';
const relativePath = __dirname.replace(workspaceRoot, '');
const coverageDirectoryPath = workspaceRoot + '/tests/coverage' + relativePath;

/* eslint-disable */
export default {
  displayName: 'nxdos-documentation-site-feature-algolia-search',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: coverageDirectoryPath,
};
