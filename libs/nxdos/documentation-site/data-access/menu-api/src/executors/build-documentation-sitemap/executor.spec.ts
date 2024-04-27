import runExecutor from './executor';

describe('BuildDocumentationSitemap Executor', () => {
  it('can successfully build documentation sitemap', async () => {
    const output = await runExecutor();
    expect(output.success).toBe(true);
  });
});
