import updateAlgoliaData from '../../lib/update-algolia-data';

export default async function runExecutor(isTestRun: boolean) {
  await updateAlgoliaData(isTestRun);
  console.log('Executor ran for UpdateAlgoliaData');

  return {
    success: true,
  };
}
