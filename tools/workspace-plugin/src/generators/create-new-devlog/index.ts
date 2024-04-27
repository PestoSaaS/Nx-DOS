import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
} from '@nx/devkit';

interface NewDevlogSchemaOptions {
  title: string;
  author?: string;
}

export default async function (tree: Tree, schema: NewDevlogSchemaOptions) {
  generateFiles(
    // virtual file system
    tree,

    // the location where the template files are
    joinPathFragments(__dirname, './files'),

    // where the files should be generated
    './docs/devlogs',

    // the variables to be substituted in the template
    {
      title: schema.title,
      author: schema.author || '',
      normalizedTitle: names(schema.title).fileName,
      creationDate: new Date().toISOString(),
    }
  );

  await formatFiles(tree);
}
