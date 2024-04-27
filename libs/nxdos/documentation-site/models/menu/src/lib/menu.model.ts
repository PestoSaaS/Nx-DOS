export interface Menu {
  sections: MenuItem[];
}

export interface MenuItem {
  name: string;
  path: string;
  itemList?: MenuItem[];
  overrideURL?: string;
  created_at?: string;
  updated_at?: string;
}
