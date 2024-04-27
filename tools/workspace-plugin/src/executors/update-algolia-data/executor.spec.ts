import runExecutor from './executor';

describe('UpdateAlgoliaData Executor', () => {
  it('should successfully prepare algolia data for update', async () => {
    jest.setTimeout(60000);
    const isTestRun = true;
    const output = await runExecutor(isTestRun);
    expect(output.success).toBe(true);
  });
});
