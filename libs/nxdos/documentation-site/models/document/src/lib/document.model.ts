export interface DocumentData {
  filePath: string;
  frontMatterData: {
    title: string;
    timestamp: { created_at: string; last_updated_at: string };
    author: { name: string };
  };
  content: string;
}

export interface TocItemMeta {
  sectionTitle: string;
  anchorLink: string;
  sectionInset: string;
  sectionTag: string;
  key: number;
}
