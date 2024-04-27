import { workspaceRoot } from '@nx/devkit';

module.exports = {
  resolveSnapshotPath: (testPath: string, snapshotExtension: string) => {
    let modifiedTestPath = testPath;
    if (workspaceRoot !== '/') {
      modifiedTestPath = modifiedTestPath.replace(workspaceRoot, '');
    }
    modifiedTestPath = 'tests/snapshots' + modifiedTestPath + snapshotExtension;
    return modifiedTestPath;
  },

  resolveTestPath: (snapshotFilePath: string, snapshotExtension: string) =>
    snapshotFilePath
      .replace(snapshotExtension, '')
      .replace('tests/snapshots', ''),

  testPathForConsistencyCheck:
    '/libs/shared/ui/layout/src/lib/header/header.spec.tsx',
};
