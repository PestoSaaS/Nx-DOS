import { workspaceRoot } from '@nx/devkit';
const relativePath = __dirname.replace(workspaceRoot, '');
const coverageDirectoryPath = workspaceRoot + '/tests/coverage' + relativePath;

/* eslint-disable */
export default {
  displayName: 'nxdos-documentation-site-data-access-menu-api',
  preset: '../../../../../jest.preset.js',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: coverageDirectoryPath,
};
