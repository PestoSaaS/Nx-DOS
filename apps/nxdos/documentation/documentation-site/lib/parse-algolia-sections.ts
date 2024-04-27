import fs from 'fs';
import path from 'path';
import { workspaceRoot } from '@nx/devkit';
import { algoliaRecordSection } from '@nxdos/documentation-site/ui/common';

const workingDirectory =
  path.resolve(__dirname).split('/.next/')[0] + '/algolia/';

const jsonFolderPath =
  process.env['NX_TASK_TARGET_TARGET'] === 'test'
    ? workspaceRoot + '/dist/test' + workingDirectory.replace(workspaceRoot, '')
    : workingDirectory;

const jsonFilePath = jsonFolderPath + 'sections.json';
const foundSource = fs.existsSync(jsonFilePath);

let sections: (algoliaRecordSection & { id: number; objectID: number })[] = [];

if (foundSource && process.env['NX_TASK_TARGET_TARGET'] !== 'test') {
  sections = JSON.parse(
    String(fs.readFileSync(jsonFilePath, { encoding: 'utf-8' }))
  );
} else {
  if (!fs.existsSync(jsonFolderPath)) {
    fs.mkdirSync(jsonFolderPath, { recursive: true });
  }
  fs.writeFileSync(jsonFilePath, JSON.stringify([], null, 4));
}

function create(section: algoliaRecordSection) {
  const id = sections.length ? Math.max(...sections.map((x) => x.id)) + 1 : 1;
  sections.push({ ...section, id: id, objectID: id });
  saveData();
}

function getNumberOfRecords() {
  return sections.length;
}

function saveData() {
  fs.writeFileSync(jsonFilePath, JSON.stringify(sections, null, 4));
}

export const algoliaSectionsStore = {
  create,
  getNumberOfRecords,
};
