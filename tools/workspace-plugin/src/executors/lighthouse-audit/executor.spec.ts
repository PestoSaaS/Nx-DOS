import runExecutor from './executor';

describe('LighthouseAudit Executor', () => {
  it('should successfully audit URL for lighthouse scores', async () => {
    jest.setTimeout(120000);
    const isTestRun = true;
    const output = await runExecutor(isTestRun);
    expect(output.success).toBe(true);
  });
});
