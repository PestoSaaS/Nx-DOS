export const sample_MenuProps = {
  name: 'Nx-DOS',
  path: 'nxdos',
  itemList: [
    {
      name: 'introduction',
      path: 'nxdos/introduction',
      overrideURL: 'introduction',
    },
    {
      name: 'getting-started',
      path: 'nxdos/getting-started',
      overrideURL: 'getting-started',
    },
    {
      name: 'configuration',
      path: 'nxdos/configuration',
      itemList: [
        {
          name: 'documentation',
          path: 'nxdos/configuration/documentation',
          overrideURL: 'configuration/documentation',
        },
        {
          name: 'usage-metrics',
          path: 'nxdos/configuration/usage-metrics',
          overrideURL: 'configuration/usage-metrics',
        },
      ],
    },
    {
      name: 'acknowledgements',
      path: 'nxdos/acknowledgements',
      overrideURL: 'acknowledgements',
    },
  ],
};
