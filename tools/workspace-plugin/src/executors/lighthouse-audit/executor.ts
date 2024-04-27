import auditLighthouseScores from '../../lib/audit-lighthouse-scores';

export default async function runExecutor(isTestRun: boolean) {
  await auditLighthouseScores(isTestRun);
  console.log('Executor ran for LighthouseAudit');

  return {
    success: true,
  };
}
