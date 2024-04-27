const { workspaceRoot } = require('@nx/devkit');

const nxPreset = require('@nx/jest/preset').default;

nxPreset.coverageReporters = ['text', 'lcov', 'json', 'clover'];
nxPreset.snapshotResolver =
  workspaceRoot +
  '/libs/shared/util/testing/src/lib/configuration/snapshot-resolver.ts';
nxPreset.moduleNameMapper = {
  '\\.svg$':
    workspaceRoot +
    '/libs/shared/util/testing/src/lib/mocks/mock-jest-svg-transform.ts',
};

module.exports = {
  ...nxPreset,
};
