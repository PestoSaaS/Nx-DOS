import algoliasearch from 'algoliasearch';
import * as fs from 'fs';

export default async function updateAlgoliaData(isTestRun = false) {
  if (
    process.env['NEXT_PUBLIC_ALGOLIA_PROJECT_APP_ID'] &&
    process.env['ALGOLIA_PROJECT_ADMIN_API_KEY'] &&
    process.env['ALGOLIA_PROJECT_INDEX_NAME']
  ) {
    const client = algoliasearch(
      process.env['NEXT_PUBLIC_ALGOLIA_PROJECT_APP_ID'],
      process.env['ALGOLIA_PROJECT_ADMIN_API_KEY']
    );

    const index = client.initIndex(process.env['ALGOLIA_PROJECT_INDEX_NAME']);

    await index.setSettings({
      // Select the attributes you want to search in
      searchableAttributes: ['sectionTitle', 'sectionContent', 'articleTitle'],
      // Define business metrics for ranking and sorting
      customRanking: ['asc(sectionOrder)', 'asc(subsectionOrder)'],
      // Define the attribute we want to distinct on
      attributeForDistinct: 'sectionTitle',
      distinct: 1,
    });

    let jsonFilePath =
      'apps/nxdos/documentation/documentation-site/algolia/sections.json';

    /* istanbul ignore next */
    if (process.env['NX_TASK_TARGET_TARGET'] !== 'test') {
      if (process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production') {
        jsonFilePath = process.cwd() + '/dist/' + jsonFilePath;
      } else {
        jsonFilePath = process.cwd() + '/dist/dev/' + jsonFilePath;
      }
    } else {
      jsonFilePath = process.cwd() + '/dist/test/' + jsonFilePath;
    }

    /* istanbul ignore next */
    if (
      !fs.existsSync(jsonFilePath) &&
      process.env['NX_TASK_TARGET_TARGET'] !== 'test'
    ) {
      console.log('  - cannot locate valid record store for algolia data.');
      console.log('    filePath:  ' + jsonFilePath);
    }

    const fileContents = fs.existsSync(jsonFilePath)
      ? (fs.readFileSync(jsonFilePath) as unknown)
      : '{}';
    const sections = JSON.parse(fileContents as string);

    /* istanbul ignore next */
    if (
      isTestRun !== true &&
      process.env['NX_TASK_TARGET_TARGET'] !== 'test' &&
      process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production' &&
      process.env['CI_EXECUTE_ALGOLIA_UPDATE'] === 'true'
    ) {
      await index.replaceAllObjects(sections).then(() => {
        console.log('Updated Algolia data');
      });
    }
  } else {
    /* istanbul ignore next */
    console.warn(
      'unable to update Algolia data, cannot locate project API key among environment variables'
    );
  }
}
