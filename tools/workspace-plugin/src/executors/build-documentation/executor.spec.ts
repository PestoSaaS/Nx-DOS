import runExecutor from './executor';

describe('BuildDocumentation Executor', () => {
  it('can successfully build documentation files', async () => {
    const output = await runExecutor();
    expect(output.success).toBe(true);
  });
});
