/* eslint-disable */
export default {
  displayName: 'nxdos-documentation-site-models-menu',
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
  coverageDirectory:
    '../../../../../tests/coverage/libs/nxdos/documentation-site/models/menu',
};
