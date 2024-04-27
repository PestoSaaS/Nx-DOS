import { workspaceRoot } from '@nx/devkit';
import axios from 'axios';
import * as fs from 'fs';

/* istanbul ignore next */
const percentageToColor = (percentage: number) => {
  if (percentage >= 95) return 'brightgreen';
  if (percentage >= 90) return 'green';
  if (percentage >= 75) return 'yellowgreen';
  if (percentage >= 60) return 'yellow';
  if (percentage >= 40) return 'orange';
  return 'red';
};

/* istanbul ignore next */
const pipeRemoteImage = async (imageUrl: string, outputPath: string) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    response.data.pipe(fs.createWriteStream(outputPath));

    return new Promise<void>((resolve, reject) => {
      response.data.on('end', () => {
        resolve();
      });

      response.data.on('error', (err: unknown) => {
        reject(err);
      });
    });
  } catch (error) {
    throw new Error(`Error downloading the image: ${error}`);
  }
};

/* istanbul ignore next */
const downloadImage = async (imageUrl: string, outputPath: string) =>
  await pipeRemoteImage(imageUrl, outputPath)
    .then(() => {
      console.log('image downloaded successfully: ' + outputPath);
    })
    .catch((error) => {
      console.error('Error downloading the image: ' + imageUrl, error);
    });

/* istanbul ignore next */
export default async function auditLighthouseScores(isTestRun = false) {
  if (isTestRun !== true) {
    // https://github.com/nrwl/nx/issues/11335, kudos to @dmastag
    const { default: lighthouse } = await (Function(
      'return import("lighthouse")'
    )() as Promise<typeof import('lighthouse')>);
    const chromeLauncher = await (Function(
      'return import("chrome-launcher")'
    )() as Promise<typeof import('chrome-launcher')>);
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
      logLevel: 'info' as const,
      output: 'html' as const,
      onlyCategories: ['performance', 'accessibility', 'best-practices'],
      port: chrome.port,
    };
    const runnerResult = await lighthouse('http://localhost:4203', options);
    // `.report` is the HTML report as a string
    const reportHtml = runnerResult?.report;

    let folderPath = 'apps/nxdos/documentation/documentation-site/lighthouse/';
    const reportFile = 'lhreport-' + new Date().toISOString() + '.html';

    if (process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production') {
      folderPath = workspaceRoot + '/dist/' + folderPath;
    } else {
      folderPath = workspaceRoot + '/dist/dev/' + folderPath;
    }

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    fs.writeFileSync(folderPath + reportFile, reportHtml as string);
    // `.lhr` is the Lighthouse Result as a JS object

    const scores = {
      accessibility:
        (runnerResult?.lhr.categories['accessibility'].score as number) * 100,
      performance:
        (runnerResult?.lhr.categories['performance'].score as number) * 100,
      'best-practices':
        (runnerResult?.lhr.categories['best-practices'].score as number) * 100,
    };

    console.log(
      '\n',
      'Report is completed for',
      runnerResult?.lhr.finalDisplayedUrl,
      '\n\n',
      'Performance score: ' + scores['performance'],
      '\n',
      'Accessibility score: ' + scores['accessibility'],
      '\n',
      'Best-practices score: ' + scores['best-practices'],
      '\n'
    );

    const badges = {
      accessibility:
        'https://img.shields.io/badge/lighthouse_accessibility-' +
        scores['accessibility'] +
        '%25-' +
        percentageToColor(scores['accessibility']),
      'best-practices':
        'https://img.shields.io/badge/lighthouse_best--practices-' +
        scores['best-practices'] +
        '%25-' +
        percentageToColor(scores['best-practices']),
    };

    const badgesFolder =
      process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production'
        ? workspaceRoot + '/.badges/'
        : folderPath + '.badges/';

    if (!fs.existsSync(badgesFolder)) {
      fs.mkdirSync(badgesFolder);
    }

    await downloadImage(
      badges['accessibility'],
      badgesFolder + 'lighthouse_accessibility.svg'
    );

    await downloadImage(
      badges['best-practices'],
      badgesFolder + 'lighthouse_best-practices.svg'
    );

    await chrome.kill();
  }
}
