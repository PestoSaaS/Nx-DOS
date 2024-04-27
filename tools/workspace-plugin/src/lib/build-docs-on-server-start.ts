import {
  copySync,
  emptyDirSync,
  rmSync,
  readFileSync,
  writeFileSync,
} from 'fs-extra';
import * as path from 'path';
import * as glob from 'glob';
import { exec } from 'child_process';
import * as fs from 'fs';
import { workspaceRoot } from '@nx/devkit';
import { promisify } from 'util';

export const build_documentation = async (): Promise<{
  success: boolean;
}> => {
  let outputFolderPath = '';
  const relativePath = '/apps/nxdos/documentation/documentation-site';
  /* istanbul ignore next */
  if (process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production') {
    outputFolderPath = workspaceRoot + '/dist' + relativePath;
  } else {
    outputFolderPath = workspaceRoot + '/dist/dev' + relativePath;
  }

  rmSync(outputFolderPath + '/public', {
    recursive: true,
    force: true,
  });
  /* istanbul ignore next */
  if (process.env['NX_TASK_TARGET_CONFIGURATION'] !== 'production') {
    emptyDirSync(workspaceRoot + relativePath + '/public');
    fs.writeFileSync(workspaceRoot + relativePath + '/public/.gitkeep', '');
  }

  copySync(
    path.resolve(
      workspaceRoot + '/node_modules/context-filter-polyfill/dist/index.js'
    ),
    path.resolve(
      process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production'
        ? outputFolderPath + '/public/polyfills/context-filter-polyfill.min.js'
        : workspaceRoot +
            relativePath +
            '/public/polyfills/context-filter-polyfill.min.js'
    ),
    { overwrite: true }
  );
  copySync(
    path.resolve(
      workspaceRoot +
        '/libs/nxdos/documentation-site/ui/common/src/assets/icons/favicons/png'
    ),
    process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production'
      ? path.resolve(outputFolderPath + '/public/images')
      : path.resolve(workspaceRoot + relativePath + '/public/images'),
    { overwrite: true }
  );
  copySync(
    path.resolve(
      workspaceRoot +
        '/libs/nxdos/documentation-site/ui/common/src/assets/icons/favicons/favicon.ico'
    ),
    process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production'
      ? path.resolve(outputFolderPath + '/public/favicon.ico')
      : path.resolve(workspaceRoot + relativePath + '/public/favicon.ico')
  );
  copySync(
    path.resolve(
      workspaceRoot +
        '/libs/nxdos/documentation-site/ui/common/src/assets/fonts'
    ),
    process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production'
      ? path.resolve(outputFolderPath + '/public/fonts')
      : path.resolve(workspaceRoot + relativePath + '/public/fonts'),

    { overwrite: true }
  );
  copySync(
    path.resolve(workspaceRoot + '/docs'),
    path.resolve(workspaceRoot + '/.docs'),
    { overwrite: true }
  );
  rmSync(path.resolve(workspaceRoot + '/.docs') + '/project.json');
  const files = glob
    .sync(path.resolve(workspaceRoot + '/.docs') + '/**/*.mdx')
    .map((file) => [file]);
  if (!files) throw new Error(`Cannot find any documents`);

  const embeddedCodeParser =
    // eslint-disable-next-line no-useless-escape
    /(?={% embeddedCode)((.|\n)*?)(?<=\/\%\})/g;
  const languageParser = /(?<=language=")(.*?)(?=")/gm;
  const filePathParser = /(?<=filePath=")(.*?)(?=")/gm;
  const extensionParser = /(?<=(\.(?=[^.]*$)))(.*?)(?=$)/g;

  files.map((file) => {
    const fileContents = readFileSync(file[0], 'utf8');
    const regexResult = fileContents.match(embeddedCodeParser);

    if (regexResult) {
      writeFileSync(
        file[0],
        fileContents.replace(embeddedCodeParser, (matchedRegexResult) => {
          let language: RegExpMatchArray | null;

          language = matchedRegexResult.match(languageParser);

          if (!language) {
            const matchedFilePath = matchedRegexResult.match(filePathParser);
            language =
              matchedFilePath !== null
                ? matchedFilePath[0].match(extensionParser)
                : [''];
          }
          const embeddedFilePath = matchedRegexResult.replace(
            filePathParser,
            '<!-- embedme $& -->'
          );
          return String(embeddedFilePath + '\n\n```' + language + '\n```');
        }),
        {
          encoding: 'utf8',
        }
      );
    }
  });

  /* istanbul ignore next */
  try {
    const { stdout } = await promisify(exec)(
      'pnpm embedme --silent ".docs/**/*.*"'
    );
    if (stdout) {
      console.log(stdout);
    }
  } catch (error) {
    console.error(error);
    console.log(
      `>> most likely a document is trying to embed a file which doesn't exist`,
      '\n'
    );
    try {
      await promisify(exec)('pnpm embedme ".docs/**/*.*"');
    } catch (error_alt: unknown) {
      console.log(
        '>> if there are any issues highlighted below fix and try again.',
        '\n',
        '\n'
      );
      process.stdout.write((error_alt as { stdout: string }).stdout);
      throw new Error(
        'failed embedding referenced code file(s) in documentation files'
      );
    }
  }

  copySync(
    path.resolve(workspaceRoot + '/.docs'),
    outputFolderPath + '/public/documentation',
    { overwrite: true }
  );
  copySync(
    path.resolve(workspaceRoot + '/.docs/images'),
    process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production'
      ? path.resolve(outputFolderPath + '/public/documentation/images')
      : path.resolve(
          workspaceRoot + relativePath + '/public/documentation/images'
        ),
    { overwrite: true }
  );
  rmSync(workspaceRoot + '/.docs', {
    recursive: true,
    force: true,
  });

  console.log('successfully built documentation files');
  // Allow time to write built documentation files to memory
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
};
