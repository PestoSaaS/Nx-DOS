import { Menu, MenuItem } from './menu.model';

describe('Nxdos - Documentation Site - Models - Menu', () => {
  describe('interfaces only exist at compile time, no code to cover here.', () => {
    const test_MenuItem: MenuItem = {
      name: 'test_MenuItem_name',
      path: 'test_MenuItem_path',
    };
    const test_Menu: Menu = { sections: [test_MenuItem] };

    it('type compliance check for Menu interface with valid "sections"', () => {
      expect(test_Menu).toHaveProperty('sections');
    });

    it('type compliance check for MenuItem interface with valid "name" and "path"', () => {
      expect(test_MenuItem).toHaveProperty('name');
      expect(test_MenuItem).toHaveProperty('path');
    });
  });
});
