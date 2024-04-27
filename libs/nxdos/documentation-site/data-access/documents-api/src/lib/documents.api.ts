import { DocumentData } from '@nxdos/documentation-site/models/document';
import { MenuItem } from '@nxdos/documentation-site/models/menu';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { extractTitle } from './documents.util';
import glob from 'glob';
import { workspaceRoot } from '@nx/devkit';

interface OverridePath {
  path: string;
  overrideURL: string;
}

const parseOverrideURLsRecursively = (menuItem: MenuItem): OverridePath[] => {
  const overridePaths: OverridePath[] = [];

  if (typeof menuItem.itemList !== 'undefined') {
    menuItem.itemList.forEach((childMenuItem: MenuItem) => {
      overridePaths.push(...parseOverrideURLsRecursively(childMenuItem));
    });
  }

  if (typeof menuItem.overrideURL !== 'undefined') {
    overridePaths.push({
      path: menuItem.path,
      overrideURL: menuItem.overrideURL,
    });
  }

  return overridePaths;
};

export class DocumentsApi {
  private DOCS_PATH: string;
  private mappedDocuments: MenuItem;
  private overridePaths: OverridePath[];
  private overrideURLs: string[];

  constructor(
    private readonly options: {
      publicDocsRootPath: string;
    }
  ) {
    this.DOCS_PATH = workspaceRoot + '/' + this.options.publicDocsRootPath;
    const mappedDocumentsRawJson = fs.readFileSync(
      this.DOCS_PATH + 'documents.json'
    );
    this.mappedDocuments = JSON.parse(mappedDocumentsRawJson.toString())[0];
    this.overridePaths = parseOverrideURLsRecursively(this.mappedDocuments);
    this.overrideURLs = this.overridePaths.map(
      (overridePath) => overridePath.overrideURL
    );
  }

  getDocument = (segments: string[]): DocumentData => {
    const checkOverridePath = this.overridePaths.find((path) => {
      return path.overrideURL === segments.join('/');
    });

    const queryPath =
      typeof checkOverridePath !== 'undefined'
        ? checkOverridePath.path
        : segments.join('/');

    const docPath = join(this.DOCS_PATH, `${queryPath}.mdx`);
    const fileContents = fs.readFileSync(docPath, 'utf8');

    const { data } = matter(fileContents);
    const frontMatterData = data;

    // Set default title if not provided in front-matter section.
    if (!frontMatterData.title) {
      frontMatterData.title =
        extractTitle(fileContents) ?? segments[segments.length - 1];
    }

    const document = {
      filePath: docPath,
      frontMatterData: frontMatterData as DocumentData['frontMatterData'],
      content: fileContents,
    };

    document.frontMatterData.author = { name: '' };

    return document;
  };

  getStaticDocumentPaths = () => {
    const files = glob.sync(this.DOCS_PATH + '/**/*.mdx').map((file) => [file]);

    const segmentsArray = files.map((file) =>
      file[0]
        // Remove documentation folder path from start
        // Remove .mdx file extensions for page paths
        .replace(this.DOCS_PATH, '')
        .replace(/\.mdx?$/, '')
        .split('/')
    );
    const paths = segmentsArray.map((segments) => ({ params: { segments } }));

    const checkForInvalidOverride = paths.find((path) =>
      this.overrideURLs.includes(path.params.segments.join('/'))
    );

    /* istanbul ignore next */
    if (checkForInvalidOverride) {
      const invalidPath = checkForInvalidOverride.params.segments.join('/');
      console.log(
        'Redirect error on path: "' + invalidPath + '"',
        '- override path conflicts with existing documentation segment',
        '- resolve conflict by removing override or changing desired URL',
        ''
      );
      throw new Error(
        'Override path conflicts with existing segment: ' + invalidPath
      );
    }

    paths.forEach((path) => {
      const pathToCheck = path.params.segments.join('/');
      const checkForOverride = this.overridePaths.find((overridePath) => {
        return overridePath.path === pathToCheck;
      });

      if (typeof checkForOverride !== 'undefined') {
        path.params.segments = checkForOverride.overrideURL.split('/');
      }
    });

    return paths;
  };
}
