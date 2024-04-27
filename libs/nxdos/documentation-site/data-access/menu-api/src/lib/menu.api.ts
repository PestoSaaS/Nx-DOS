import { Menu, MenuItem } from '@nxdos/documentation-site/models/menu';
import { workspaceRoot } from '@nx/devkit';
import { join } from 'path';
import * as glob from 'glob';
import * as fs from 'fs';
import matter from 'gray-matter';
import * as matterAltImport from 'gray-matter';

let matterProxy: typeof matter;
if (typeof matter === 'undefined') {
  // safe to use the function
  matterProxy = matterAltImport as typeof matter;
} else {
  matterProxy = matter;
}

export class MenuApi {
  private menuCache: Menu | null = null;
  private DOCS_PATH: string;

  constructor(
    private readonly options: {
      publicDocsRootPath: string;
    }
  ) {
    this.DOCS_PATH = workspaceRoot + '/' + this.options.publicDocsRootPath;
  }

  private listFlattenedMenu(sections: MenuItem[]): MenuItem[] {
    let orderedList: MenuItem[] = [];

    for (let i = 0; i < sections.length; i++) {
      if (typeof sections[i].itemList !== 'undefined' && sections[i].itemList) {
        orderedList = orderedList.concat(
          this.listFlattenedMenu(sections[i].itemList as MenuItem[])
        );
      } else {
        orderedList.push(sections[i]);
      }
    }
    return orderedList;
  }

  getOrderedSitemap(): MenuItem[] {
    return this.listFlattenedMenu(this.getMenu().sections);
  }

  getMenu(): Menu {
    // this way we cache our menu
    let menu = this.menuCache;
    if (menu) return menu;

    // retreive all MDX documents from docs directory
    const files = glob.sync(this.DOCS_PATH + '/**/*.mdx').map((file) => [file]);
    if (!files) throw new Error(`Cannot find any documents`);

    const menuItems = files.map((file) =>
      file[0]
        // Remove documentation folder path from start
        .replace(this.DOCS_PATH, '')
        // Remove .mdx file extensions for page paths
        .replace(/\.mdx?$/, '')
        .split('/')
    );

    // documents.json file is referenced for manual ordering
    // if a folder isn't present in documents.json it will be
    // parsed and sorted automatically
    const documentsRawJson = fs.readFileSync(this.DOCS_PATH + 'documents.json');
    const mappedDocuments = JSON.parse(documentsRawJson.toString());

    const multiSort = (arrayToSort: MenuItem[]) => {
      arrayToSort.sort((a: MenuItem, b: MenuItem) => {
        // First sort by folder vs file
        if (
          !(typeof a.itemList !== 'undefined') &&
          typeof b.itemList !== 'undefined'
        )
          return 1;
        if (
          !(typeof b.itemList !== 'undefined') &&
          typeof a.itemList !== 'undefined'
        )
          return -1;
        // Second sort alphabetically
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        else return 0;
      });
    };

    const mapDocuments = (items: string[][]) => {
      // items array lists each path in chunked segments, i.e.
      // [
      //   [ 'devlogs', 'commitizen-setup' ],
      //   [ 'devlogs', 'markdoc-samples' ],
      //   [ 'devlogs', 'nextjs-docs-site' ],
      //   [ 'devlogs', 'product-analytics' ]
      // ]

      // we will look for folder nodes to list them first
      const folders: MenuItem[] = [];

      for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items[i].length; j++) {
          if (!(j + 1 === items[i].length)) {
            const folder = {
              name: items[i][j],
              path: items[i].slice(0, j + 1).join('/'),
            };

            if (
              folders.filter((f: MenuItem) => f.path === folder.path).length <=
              0
            ) {
              /* folders doesn't contain the folder we're looking for */
              folders.push(folder);
            }
          }

          if (j + 1 === items[i].length) {
            const leafName = items[i][j];
            const leafPath = items[i].slice(0, j + 1).join('/');
            const leafFullPath = join(
              this.DOCS_PATH,
              `${items[i].join('/')}.mdx`
            );
            const fileContents = fs.readFileSync(leafFullPath, 'utf8');
            const { data } = matterProxy(fileContents);

            const leaf: MenuItem = {
              name: leafName,
              path: leafPath,
              ...(data.timestamp.created_at != undefined && {
                created_at: data.timestamp.created_at,
              }),
            };

            const leafSubPath = leaf.path.split('/').slice(0, -1).join('/');
            const selectionIndex = folders
              .map((f: MenuItem) => f.path)
              .indexOf(leafSubPath);

            if (selectionIndex != -1) {
              /* folders contains the element we're looking for */
              if (typeof folders[selectionIndex].itemList !== 'undefined') {
                folders[selectionIndex].itemList?.push({ ...leaf });
              } else {
                folders[selectionIndex].itemList = [{ ...leaf }];
              }
            }
          }
        }
      }

      const foldersSortedByDepth = [...folders].sort((a, b) =>
        a.path.split('/').length > b.path.split('/').length
          ? -1
          : b.path.split('/').length > a.path.split('/').length
          ? 1
          : 0
      );

      const toBeDeleted: string[] = [];

      foldersSortedByDepth.forEach((selection) => {
        const folderSubPath = selection.path.split('/').slice(0, -1).join('/');
        for (let j = 0; j < foldersSortedByDepth.length; j++) {
          if (foldersSortedByDepth[j].path === folderSubPath) {
            if (typeof selection.itemList !== 'undefined') {
              multiSort(selection.itemList);
            }
            if (typeof foldersSortedByDepth[j].itemList === 'undefined') {
              foldersSortedByDepth[j].itemList = [];
            }
            foldersSortedByDepth[j].itemList?.push(selection);

            const index = foldersSortedByDepth
              .map((f) => {
                return f.path;
              })
              .indexOf(selection.path);
            toBeDeleted.push(foldersSortedByDepth[index].path);
          }
        }
      });

      for (let i = 0; i < toBeDeleted.length; i++) {
        foldersSortedByDepth.splice(
          foldersSortedByDepth.findIndex(
            (item) => item.path === toBeDeleted[i]
          ),
          1
        );
      }

      multiSort(foldersSortedByDepth);
      for (let i = 0; i < foldersSortedByDepth.length; i++) {
        if (typeof foldersSortedByDepth[i].itemList !== 'undefined') {
          multiSort(foldersSortedByDepth[i].itemList as MenuItem[]);
        }
      }

      return foldersSortedByDepth;
    };

    // sections mapped manually from documents.json
    const mappedSections: MenuItem[][] = [];

    // sections parsed automatically from other folders in docs directory
    const parsedSections: MenuItem[][] = [];

    [...new Set(menuItems.map((item) => item[0]))].map((section) => {
      if (
        mappedDocuments
          .map((document: MenuItem) => document.path)
          .includes(section)
      ) {
        // if section exists in documents.json use provided mapping
        const selectedDocuments = mappedDocuments.filter(
          (selection: MenuItem) => {
            return selection.path === section;
          }
        );
        mappedSections.push(selectedDocuments);
        return selectedDocuments;
      } else {
        // otherwise parse the files in the directory
        const filteredItems = menuItems.filter((item) => {
          return item[0] === section;
        });

        parsedSections.push(mapDocuments(filteredItems));
        return mapDocuments(filteredItems);
      }
    });

    let mergedSections: MenuItem[] = [];

    for (let i = 0; i < mappedSections.length; i++) {
      mergedSections = mergedSections.concat(mappedSections[i]);
    }

    for (let i = 0; i < parsedSections.length; i++) {
      if (parsedSections[i][0].name !== 'devlogs') {
        mergedSections = mergedSections.concat(parsedSections[i]);
      } else {
        const devlogs = parsedSections[i];
        if (devlogs.length > 0) {
          devlogs[0].itemList?.sort(function (a: MenuItem, b: MenuItem) {
            return (
              Date.parse(a.created_at || '') - Date.parse(b.created_at || '')
            );
          });
          mergedSections = mergedSections.concat(devlogs);
        }
      }
    }

    menu = { sections: mergedSections };
    this.menuCache = menu;

    return menu;
  }
}
