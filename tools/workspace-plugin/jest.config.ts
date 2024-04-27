import { workspaceRoot } from '@nx/devkit';
const relativePath = __dirname.replace(workspaceRoot, '');
const coverageDirectoryPath = workspaceRoot + '/tests/coverage' + relativePath;

/* eslint-disable */
export default {
  displayName: 'nxdos-workspace-plugin',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    '\\.(js|ts|tsx)$': [
      'ts-jest',
      { tsconfig: '<rootDir>/tsconfig.spec.json' },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/algoliasearch',
    'node_modules/algoliasearch-helper',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: coverageDirectoryPath,
};
