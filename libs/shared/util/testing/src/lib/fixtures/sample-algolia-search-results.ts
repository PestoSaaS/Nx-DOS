import { SearchResults as AlgoliaSearchResults } from 'algoliasearch-helper';
import { BaseHit, Hit } from 'instantsearch.js/es/types';

export const sample_AlgoliaSearchResults = {
  _rawResults: [
    {
      hits: [
        {
          articleTitle: 'Simple search integration using Algolia',
          articlePath: 'devlogs/algolia-search',
          sectionTitle: 'Algolia widgets',
          anchorLink: 'algolia-widgets',
          sectionURL: 'devlogs/algolia-search#algolia-widgets',
          sectionContent: 'Algolia widgets',
          sectionOrder: 11,
          subsectionOrder: 1,
          subsectionURL: 'devlogs/algolia-search#algolia-widgets?s=1',
          id: 41,
          objectID: '41',
          _highlightResult: {
            articleTitle: {
              value:
                'Simple search integration using __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionTitle: {
              value: '__ais-highlight__Algo__/ais-highlight__lia widgets',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionContent: {
              value: '__ais-highlight__Algo__/ais-highlight__lia widgets',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Documentation Setup',
          articlePath: 'configuration/documentation',
          sectionTitle: 'Configuring Algolia search',
          anchorLink: 'configuring-algolia-search',
          sectionURL: 'configuration/documentation#configuring-algolia-search',
          sectionContent: 'Configuring Algolia search',
          sectionOrder: 3,
          subsectionOrder: 1,
          subsectionURL:
            'configuration/documentation#configuring-algolia-search?s=1',
          id: 301,
          objectID: '301',
          _highlightResult: {
            articleTitle: {
              value: 'Documentation Setup',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionTitle: {
              value:
                'Configuring __ais-highlight__Algo__/ais-highlight__lia search',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionContent: {
              value:
                'Configuring __ais-highlight__Algo__/ais-highlight__lia search',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Simple search integration using Algolia',
          articlePath: 'devlogs/algolia-search',
          sectionTitle: 'Integrating Algolia',
          anchorLink: 'integrating-algolia',
          sectionURL: 'devlogs/algolia-search#integrating-algolia',
          sectionContent: 'Integrating Algolia',
          sectionOrder: 3,
          subsectionOrder: 1,
          subsectionURL: 'devlogs/algolia-search#integrating-algolia?s=1',
          id: 11,
          objectID: '11',
          _highlightResult: {
            articleTitle: {
              value:
                'Simple search integration using __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionTitle: {
              value: 'Integrating __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionContent: {
              value: 'Integrating __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Simple search integration using Algolia',
          articlePath: 'devlogs/algolia-search',
          sectionTitle: 'Why use Algolia?',
          anchorLink: 'why-use-algolia',
          sectionURL: 'devlogs/algolia-search#why-use-algolia',
          sectionContent: 'Why use Algolia?',
          sectionOrder: 2,
          subsectionOrder: 1,
          subsectionURL: 'devlogs/algolia-search#why-use-algolia?s=1',
          id: 6,
          objectID: '6',
          _highlightResult: {
            articleTitle: {
              value:
                'Simple search integration using __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionTitle: {
              value: 'Why use __ais-highlight__Algo__/ais-highlight__lia?',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionContent: {
              value: 'Why use __ais-highlight__Algo__/ais-highlight__lia?',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Optimizing for reader mode across browsers',
          articlePath: 'devlogs/reader-mode-fixes',
          sectionTitle: 'Structural factors',
          anchorLink: 'structural-factors',
          sectionURL: 'devlogs/reader-mode-fixes#structural-factors',
          sectionContent:
            'Parsing algorithms look for tags such as  body ,  article ,  content ,  entry ,  text , etc, in relative positions to each other. Satisfying matches are then granted positive scores, also factoring other attributes such as classnames.',
          sectionOrder: 7,
          subsectionOrder: 2,
          subsectionURL: 'devlogs/reader-mode-fixes#structural-factors?s=2',
          id: 242,
          objectID: '242',
          _highlightResult: {
            articleTitle: {
              value: 'Optimizing for reader mode across browsers',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionTitle: {
              value: 'Structural factors',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                'Parsing __ais-highlight__algo__/ais-highlight__rithms look for tags such as  body ,  article ,  content ,  entry ,  text , etc, in relative positions to each other. Satisfying matches are then granted positive scores, also factoring other attributes such as classnames.',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Simple search integration using Algolia',
          articlePath: 'devlogs/algolia-search',
          sectionTitle: 'Install API client',
          anchorLink: 'install-api-client',
          sectionURL: 'devlogs/algolia-search#install-api-client',
          sectionContent: 'pnpm add algoliasearch\n',
          sectionOrder: 4,
          subsectionOrder: 3,
          subsectionURL: 'devlogs/algolia-search#install-api-client?s=3',
          id: 15,
          objectID: '15',
          _highlightResult: {
            articleTitle: {
              value:
                'Simple search integration using __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionTitle: {
              value: 'Install API client',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                'pnpm add __ais-highlight__algo__/ais-highlight__liasearch\n',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Documentation Setup',
          articlePath: 'configuration/documentation',
          sectionTitle: 'Updating search data',
          anchorLink: 'updating-search-data',
          sectionURL: 'configuration/documentation#updating-search-data',
          sectionContent: 'pnpm nx run nxdos-documentation-site:sync-algolia\n',
          sectionOrder: 5,
          subsectionOrder: 7,
          subsectionURL: 'configuration/documentation#updating-search-data?s=7',
          id: 314,
          objectID: '314',
          _highlightResult: {
            articleTitle: {
              value: 'Documentation Setup',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionTitle: {
              value: 'Updating search data',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                'pnpm nx run nxdos-documentation-site:sync-__ais-highlight__algo__/ais-highlight__lia\n',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Simple search integration using Algolia',
          articlePath: 'devlogs/algolia-search',
          sectionTitle: 'Push your data',
          anchorLink: 'push-your-data',
          sectionURL: 'devlogs/algolia-search#push-your-data',
          sectionContent:
            'Dashboard No-code connectors Crawler Ecommerce integrations Algolia CLI',
          sectionOrder: 6,
          subsectionOrder: 4,
          subsectionURL: 'devlogs/algolia-search#push-your-data?s=4',
          id: 26,
          objectID: '26',
          _highlightResult: {
            articleTitle: {
              value:
                'Simple search integration using __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionTitle: {
              value: 'Push your data',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                'Dashboard No-code connectors Crawler Ecommerce integrations __ais-highlight__Algo__/ais-highlight__lia CLI',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Simple search integration using Algolia',
          articlePath: 'devlogs/algolia-search',
          sectionTitle: 'Composing a custom executor',
          anchorLink: 'composing-a-custom-executor',
          sectionURL: 'devlogs/algolia-search#composing-a-custom-executor',
          sectionContent:
            'pnpm nx generate @nx/plugin:executor update-algolia-data --project=nxdos-workspace-plugin\n',
          sectionOrder: 7,
          subsectionOrder: 3,
          subsectionURL:
            'devlogs/algolia-search#composing-a-custom-executor?s=3',
          id: 31,
          objectID: '31',
          _highlightResult: {
            articleTitle: {
              value:
                'Simple search integration using __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionTitle: {
              value: 'Composing a custom executor',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                'pnpm nx generate @nx/plugin:executor update-__ais-highlight__algo__/ais-highlight__lia-data --project=nxdos-workspace-plugin\n',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Simple search integration using Algolia',
          articlePath: 'devlogs/algolia-search',
          sectionTitle: 'Building our search UI',
          anchorLink: 'building-our-search-ui',
          sectionURL: 'devlogs/algolia-search#building-our-search-ui',
          sectionContent:
            'pnpm nx g @nx/react:lib --name=algolia-search --directory=nxdos/documentation-site/feature --style=css\n',
          sectionOrder: 9,
          subsectionOrder: 3,
          subsectionURL: 'devlogs/algolia-search#building-our-search-ui?s=3',
          id: 38,
          objectID: '38',
          _highlightResult: {
            articleTitle: {
              value:
                'Simple search integration using __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionTitle: {
              value: 'Building our search UI',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                'pnpm nx g @nx/react:lib --name=__ais-highlight__algo__/ais-highlight__lia-search --directory=nxdos/documentation-site/feature --style=css\n',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Simple search integration using Algolia',
          articlePath: 'devlogs/algolia-search',
          sectionTitle: 'Custom components',
          anchorLink: 'custom-components',
          sectionURL: 'devlogs/algolia-search#custom-components',
          sectionContent:
            "For further implementation details please refer to  Algolia's React InstantSearch docs  with up to date information.",
          sectionOrder: 12,
          subsectionOrder: 3,
          subsectionURL: 'devlogs/algolia-search#custom-components?s=3',
          id: 48,
          objectID: '48',
          _highlightResult: {
            articleTitle: {
              value:
                'Simple search integration using __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionTitle: {
              value: 'Custom components',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                "For further implementation details please refer to  __ais-highlight__Algo__/ais-highlight__lia's React InstantSearch docs  with up to date information.",
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Simple search integration using Algolia',
          articlePath: 'devlogs/algolia-search',
          sectionTitle: 'Adding InstantSearch to your app',
          anchorLink: 'adding-instantsearch-to-your-app',
          sectionURL: 'devlogs/algolia-search#adding-instantsearch-to-your-app',
          sectionContent:
            'Initiate the search client using the  API key  and  App ID  provided by Algolia, and connect your InstantSearch app to Algolia by wrapping it inside the  <InstantSearch>  provider.',
          sectionOrder: 10,
          subsectionOrder: 2,
          subsectionURL:
            'devlogs/algolia-search#adding-instantsearch-to-your-app?s=2',
          id: 40,
          objectID: '40',
          _highlightResult: {
            articleTitle: {
              value:
                'Simple search integration using __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionTitle: {
              value: 'Adding InstantSearch to your app',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                'Initiate the search client using the  API key  and  App ID  provided by __ais-highlight__Algo__/ais-highlight__lia, and connect your InstantSearch app to __ais-highlight__Algo__/ais-highlight__lia by wrapping it inside the  <InstantSearch>  provider.',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Optimizing for reader mode across browsers',
          articlePath: 'devlogs/reader-mode-fixes',
          sectionTitle: 'Linguistic filtering',
          anchorLink: 'linguistic-filtering',
          sectionURL: 'devlogs/reader-mode-fixes#linguistic-filtering',
          sectionContent:
            'Another unfortunate result of the exaggerated word specific filtering built into the content retrieval algorithms of  safari-reader-js  is flakey output based on type of content.',
          sectionOrder: 16,
          subsectionOrder: 2,
          subsectionURL: 'devlogs/reader-mode-fixes#linguistic-filtering?s=2',
          id: 269,
          objectID: '269',
          _highlightResult: {
            articleTitle: {
              value: 'Optimizing for reader mode across browsers',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionTitle: {
              value: 'Linguistic filtering',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                'Another unfortunate result of the exaggerated word specific filtering built into the content retrieval __ais-highlight__algo__/ais-highlight__rithms of  safari-reader-js  is flakey output based on type of content.',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Simple search integration using Algolia',
          articlePath: 'devlogs/algolia-search',
          sectionTitle: 'Structure your data',
          anchorLink: 'structure-your-data',
          sectionURL: 'devlogs/algolia-search#structure-your-data',
          sectionContent:
            "if (process.env['NEXT_PHASE'] === PHASE_PRODUCTION_BUILD) {\n  const sectionList = await collectSections(document);\n  sectionList.forEach((section) => {\n    algoliaSectionsRepo.create(section);\n  });\n}\n",
          sectionOrder: 5,
          subsectionOrder: 7,
          subsectionURL: 'devlogs/algolia-search#structure-your-data?s=7',
          id: 22,
          objectID: '22',
          _highlightResult: {
            articleTitle: {
              value:
                'Simple search integration using __ais-highlight__Algo__/ais-highlight__lia',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
            sectionTitle: {
              value: 'Structure your data',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                "if (process.env['NEXT_PHASE'] === PHASE_PRODUCTION_BUILD) {\n  const sectionList = await collectSections(document);\n  sectionList.forEach((section) => {\n    __ais-highlight__algo__/ais-highlight__liaSectionsRepo.create(section);\n  });\n}\n",
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
        {
          articleTitle: 'Introduction to Nx-DOS',
          articlePath: 'introduction',
          sectionTitle: 'Stack overview',
          anchorLink: 'stack-overview',
          sectionURL: 'introduction#stack-overview',
          sectionContent:
            'commitizen  for conventional commits next.js  web app with  markdoc  for our documentation expo  /  react native  /  react native web  to unify client code tamagui  for developing a universal component library cypress ,  detox  and  playwright  for e2e tests react-18next  for internationalization amplify  for authentication algolia  as our hosted search engine posthog  for self hosted analytics, feature flags and a/b tests circleci  or  github actions  for CI/CD lint/build/test/deploy pipeline nx release  for versioning and automated changelog generation.',
          sectionOrder: 3,
          subsectionOrder: 3,
          subsectionURL: 'introduction#stack-overview?s=3',
          id: 359,
          objectID: '359',
          _highlightResult: {
            articleTitle: {
              value: 'Introduction to Nx-DOS',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionTitle: {
              value: 'Stack overview',
              matchLevel: 'none',
              matchedWords: [],
            },
            sectionContent: {
              value:
                'commitizen  for conventional commits next.js  web app with  markdoc  for our documentation expo  /  react native  /  react native web  to unify client code tamagui  for developing a universal component library cypress ,  detox  and  playwright  for e2e tests react-18next  for internationalization amplify  for authentication __ais-highlight__algo__/ais-highlight__lia  as our hosted search engine posthog  for self hosted analytics, feature flags and a/b tests circleci  or  github actions  for CI/CD lint/build/test/deploy pipeline nx release  for versioning and automated changelog generation.',
              matchLevel: 'full',
              fullyHighlighted: false,
              matchedWords: ['algo'],
            },
          },
        },
      ],
      nbHits: 34,
      page: 0,
      nbPages: 3,
      hitsPerPage: 15,
      exhaustiveNbHits: true,
      exhaustiveTypo: true,
      exhaustive: { nbHits: true, typo: true },
      query: 'algo',
      params:
        'facets=%5B%5D&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&page=0&query=algo&tagFilters=',
      index: 'nxdos_docs',
      renderingContent: {},
      processingTimeMS: 1,
      processingTimingsMS: { _request: { roundTrip: 31 } },
    },
  ],
  hits: [
    {
      articleTitle: 'Simple search integration using Algolia',
      articlePath: 'devlogs/algolia-search',
      sectionTitle: 'Algolia widgets',
      anchorLink: 'algolia-widgets',
      sectionURL: 'devlogs/algolia-search#algolia-widgets',
      sectionContent: 'Algolia widgets',
      sectionOrder: 11,
      subsectionOrder: 1,
      subsectionURL: 'devlogs/algolia-search#algolia-widgets?s=1',
      id: 41,
      objectID: '41',
      _highlightResult: {
        articleTitle: {
          value: 'Simple search integration using <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionTitle: {
          value: '<mark>Algo</mark>lia widgets',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionContent: {
          value: '<mark>Algo</mark>lia widgets',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Documentation Setup',
      articlePath: 'configuration/documentation',
      sectionTitle: 'Configuring Algolia search',
      anchorLink: 'configuring-algolia-search',
      sectionURL: 'configuration/documentation#configuring-algolia-search',
      sectionContent: 'Configuring Algolia search',
      sectionOrder: 3,
      subsectionOrder: 1,
      subsectionURL:
        'configuration/documentation#configuring-algolia-search?s=1',
      id: 301,
      objectID: '301',
      _highlightResult: {
        articleTitle: {
          value: 'Documentation Setup',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionTitle: {
          value: 'Configuring <mark>Algo</mark>lia search',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionContent: {
          value: 'Configuring <mark>Algo</mark>lia search',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Simple search integration using Algolia',
      articlePath: 'devlogs/algolia-search',
      sectionTitle: 'Integrating Algolia',
      anchorLink: 'integrating-algolia',
      sectionURL: 'devlogs/algolia-search#integrating-algolia',
      sectionContent: 'Integrating Algolia',
      sectionOrder: 3,
      subsectionOrder: 1,
      subsectionURL: 'devlogs/algolia-search#integrating-algolia?s=1',
      id: 11,
      objectID: '11',
      _highlightResult: {
        articleTitle: {
          value: 'Simple search integration using <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionTitle: {
          value: 'Integrating <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionContent: {
          value: 'Integrating <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Simple search integration using Algolia',
      articlePath: 'devlogs/algolia-search',
      sectionTitle: 'Why use Algolia?',
      anchorLink: 'why-use-algolia',
      sectionURL: 'devlogs/algolia-search#why-use-algolia',
      sectionContent: 'Why use Algolia?',
      sectionOrder: 2,
      subsectionOrder: 1,
      subsectionURL: 'devlogs/algolia-search#why-use-algolia?s=1',
      id: 6,
      objectID: '6',
      _highlightResult: {
        articleTitle: {
          value: 'Simple search integration using <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionTitle: {
          value: 'Why use <mark>Algo</mark>lia?',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionContent: {
          value: 'Why use <mark>Algo</mark>lia?',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Optimizing for reader mode across browsers',
      articlePath: 'devlogs/reader-mode-fixes',
      sectionTitle: 'Structural factors',
      anchorLink: 'structural-factors',
      sectionURL: 'devlogs/reader-mode-fixes#structural-factors',
      sectionContent:
        'Parsing algorithms look for tags such as  body ,  article ,  content ,  entry ,  text , etc, in relative positions to each other. Satisfying matches are then granted positive scores, also factoring other attributes such as classnames.',
      sectionOrder: 7,
      subsectionOrder: 2,
      subsectionURL: 'devlogs/reader-mode-fixes#structural-factors?s=2',
      id: 242,
      objectID: '242',
      _highlightResult: {
        articleTitle: {
          value: 'Optimizing for reader mode across browsers',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionTitle: {
          value: 'Structural factors',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value:
            'Parsing <mark>algo</mark>rithms look for tags such as  body ,  article ,  content ,  entry ,  text , etc, in relative positions to each other. Satisfying matches are then granted positive scores, also factoring other attributes such as classnames.',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Simple search integration using Algolia',
      articlePath: 'devlogs/algolia-search',
      sectionTitle: 'Install API client',
      anchorLink: 'install-api-client',
      sectionURL: 'devlogs/algolia-search#install-api-client',
      sectionContent: 'pnpm add algoliasearch\n',
      sectionOrder: 4,
      subsectionOrder: 3,
      subsectionURL: 'devlogs/algolia-search#install-api-client?s=3',
      id: 15,
      objectID: '15',
      _highlightResult: {
        articleTitle: {
          value: 'Simple search integration using <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionTitle: {
          value: 'Install API client',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value: 'pnpm add <mark>algo</mark>liasearch\n',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Documentation Setup',
      articlePath: 'configuration/documentation',
      sectionTitle: 'Updating search data',
      anchorLink: 'updating-search-data',
      sectionURL: 'configuration/documentation#updating-search-data',
      sectionContent: 'pnpm nx run nxdos-documentation-site:sync-algolia\n',
      sectionOrder: 5,
      subsectionOrder: 7,
      subsectionURL: 'configuration/documentation#updating-search-data?s=7',
      id: 314,
      objectID: '314',
      _highlightResult: {
        articleTitle: {
          value: 'Documentation Setup',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionTitle: {
          value: 'Updating search data',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value:
            'pnpm nx run nxdos-documentation-site:sync-<mark>algo</mark>lia\n',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Simple search integration using Algolia',
      articlePath: 'devlogs/algolia-search',
      sectionTitle: 'Push your data',
      anchorLink: 'push-your-data',
      sectionURL: 'devlogs/algolia-search#push-your-data',
      sectionContent:
        'Dashboard No-code connectors Crawler Ecommerce integrations Algolia CLI',
      sectionOrder: 6,
      subsectionOrder: 4,
      subsectionURL: 'devlogs/algolia-search#push-your-data?s=4',
      id: 26,
      objectID: '26',
      _highlightResult: {
        articleTitle: {
          value: 'Simple search integration using <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionTitle: {
          value: 'Push your data',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value:
            'Dashboard No-code connectors Crawler Ecommerce integrations <mark>Algo</mark>lia CLI',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Simple search integration using Algolia',
      articlePath: 'devlogs/algolia-search',
      sectionTitle: 'Composing a custom executor',
      anchorLink: 'composing-a-custom-executor',
      sectionURL: 'devlogs/algolia-search#composing-a-custom-executor',
      sectionContent:
        'pnpm nx generate @nx/plugin:executor update-algolia-data --project=nxdos-workspace-plugin\n',
      sectionOrder: 7,
      subsectionOrder: 3,
      subsectionURL: 'devlogs/algolia-search#composing-a-custom-executor?s=3',
      id: 31,
      objectID: '31',
      _highlightResult: {
        articleTitle: {
          value: 'Simple search integration using <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionTitle: {
          value: 'Composing a custom executor',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value:
            'pnpm nx generate @nx/plugin:executor update-<mark>algo</mark>lia-data --project=nxdos-workspace-plugin\n',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Simple search integration using Algolia',
      articlePath: 'devlogs/algolia-search',
      sectionTitle: 'Building our search UI',
      anchorLink: 'building-our-search-ui',
      sectionURL: 'devlogs/algolia-search#building-our-search-ui',
      sectionContent:
        'pnpm nx g @nx/react:lib --name=algolia-search --directory=nxdos/documentation-site/feature --style=css\n',
      sectionOrder: 9,
      subsectionOrder: 3,
      subsectionURL: 'devlogs/algolia-search#building-our-search-ui?s=3',
      id: 38,
      objectID: '38',
      _highlightResult: {
        articleTitle: {
          value: 'Simple search integration using <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionTitle: {
          value: 'Building our search UI',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value:
            'pnpm nx g @nx/react:lib --name=<mark>algo</mark>lia-search --directory=nxdos/documentation-site/feature --style=css\n',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Simple search integration using Algolia',
      articlePath: 'devlogs/algolia-search',
      sectionTitle: 'Custom components',
      anchorLink: 'custom-components',
      sectionURL: 'devlogs/algolia-search#custom-components',
      sectionContent:
        "For further implementation details please refer to  Algolia's React InstantSearch docs  with up to date information.",
      sectionOrder: 12,
      subsectionOrder: 3,
      subsectionURL: 'devlogs/algolia-search#custom-components?s=3',
      id: 48,
      objectID: '48',
      _highlightResult: {
        articleTitle: {
          value: 'Simple search integration using <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionTitle: {
          value: 'Custom components',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value:
            'For further implementation details please refer to  <mark>Algo</mark>lia&#39;s React InstantSearch docs  with up to date information.',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Simple search integration using Algolia',
      articlePath: 'devlogs/algolia-search',
      sectionTitle: 'Adding InstantSearch to your app',
      anchorLink: 'adding-instantsearch-to-your-app',
      sectionURL: 'devlogs/algolia-search#adding-instantsearch-to-your-app',
      sectionContent:
        'Initiate the search client using the  API key  and  App ID  provided by Algolia, and connect your InstantSearch app to Algolia by wrapping it inside the  <InstantSearch>  provider.',
      sectionOrder: 10,
      subsectionOrder: 2,
      subsectionURL:
        'devlogs/algolia-search#adding-instantsearch-to-your-app?s=2',
      id: 40,
      objectID: '40',
      _highlightResult: {
        articleTitle: {
          value: 'Simple search integration using <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionTitle: {
          value: 'Adding InstantSearch to your app',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value:
            'Initiate the search client using the  API key  and  App ID  provided by <mark>Algo</mark>lia, and connect your InstantSearch app to <mark>Algo</mark>lia by wrapping it inside the  &lt;InstantSearch&gt;  provider.',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Optimizing for reader mode across browsers',
      articlePath: 'devlogs/reader-mode-fixes',
      sectionTitle: 'Linguistic filtering',
      anchorLink: 'linguistic-filtering',
      sectionURL: 'devlogs/reader-mode-fixes#linguistic-filtering',
      sectionContent:
        'Another unfortunate result of the exaggerated word specific filtering built into the content retrieval algorithms of  safari-reader-js  is flakey output based on type of content.',
      sectionOrder: 16,
      subsectionOrder: 2,
      subsectionURL: 'devlogs/reader-mode-fixes#linguistic-filtering?s=2',
      id: 269,
      objectID: '269',
      _highlightResult: {
        articleTitle: {
          value: 'Optimizing for reader mode across browsers',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionTitle: {
          value: 'Linguistic filtering',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value:
            'Another unfortunate result of the exaggerated word specific filtering built into the content retrieval <mark>algo</mark>rithms of  safari-reader-js  is flakey output based on type of content.',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Simple search integration using Algolia',
      articlePath: 'devlogs/algolia-search',
      sectionTitle: 'Structure your data',
      anchorLink: 'structure-your-data',
      sectionURL: 'devlogs/algolia-search#structure-your-data',
      sectionContent:
        "if (process.env['NEXT_PHASE'] === PHASE_PRODUCTION_BUILD) {\n  const sectionList = await collectSections(document);\n  sectionList.forEach((section) => {\n    algoliaSectionsRepo.create(section);\n  });\n}\n",
      sectionOrder: 5,
      subsectionOrder: 7,
      subsectionURL: 'devlogs/algolia-search#structure-your-data?s=7',
      id: 22,
      objectID: '22',
      _highlightResult: {
        articleTitle: {
          value: 'Simple search integration using <mark>Algo</mark>lia',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
        sectionTitle: {
          value: 'Structure your data',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value:
            "if (process.env['NEXT_PHASE'] === PHASE_PRODUCTION_BUILD) {\n  const sectionList = await collectSections(document);\n  sectionList.forEach((section) =&gt; {\n    <mark>algo</mark>liaSectionsRepo.create(section);\n  });\n}\n",
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
    {
      articleTitle: 'Introduction to Nx-DOS',
      articlePath: 'introduction',
      sectionTitle: 'Stack overview',
      anchorLink: 'stack-overview',
      sectionURL: 'introduction#stack-overview',
      sectionContent:
        'commitizen  for conventional commits next.js  web app with  markdoc  for our documentation expo  /  react native  /  react native web  to unify client code tamagui  for developing a universal component library cypress ,  detox  and  playwright  for e2e tests react-18next  for internationalization amplify  for authentication algolia  as our hosted search engine posthog  for self hosted analytics, feature flags and a/b tests circleci  or  github actions  for CI/CD lint/build/test/deploy pipeline nx release  for versioning and automated changelog generation.',
      sectionOrder: 3,
      subsectionOrder: 3,
      subsectionURL: 'introduction#stack-overview?s=3',
      id: 359,
      objectID: '359',
      _highlightResult: {
        articleTitle: {
          value: 'Introduction to Nx-DOS',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionTitle: {
          value: 'Stack overview',
          matchLevel: 'none',
          matchedWords: [],
        },
        sectionContent: {
          value:
            'commitizen  for conventional commits next.js  web app with  markdoc  for our documentation expo  /  react native  /  react native web  to unify client code tamagui  for developing a universal component library cypress ,  detox  and  playwright  for e2e tests react-18next  for internationalization amplify  for authentication <mark>algo</mark>lia  as our hosted search engine posthog  for self hosted analytics, feature flags and a/b tests circleci  or  github actions  for CI/CD lint/build/test/deploy pipeline nx release  for versioning and automated changelog generation.',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['algo'],
        },
      },
    },
  ],
  nbHits: 34,
  page: 0,
  nbPages: 3,
  hitsPerPage: 15,
  exhaustiveNbHits: true,
  exhaustiveTypo: true,
  exhaustive: { nbHits: true, typo: true },
  query: 'algo',
  params:
    'facets=%5B%5D&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&page=0&query=algo&tagFilters=',
  index: 'nxdos_docs',
  renderingContent: {},
  processingTimeMS: 1,
  processingTimingsMS: { _request: { roundTrip: 31 } },
  persistHierarchicalRootCount: false,
  disjunctiveFacets: [],
  hierarchicalFacets: [],
  facets: [],
  _state: {
    facets: [],
    disjunctiveFacets: [],
    hierarchicalFacets: [],
    facetsRefinements: {},
    facetsExcludes: {},
    disjunctiveFacetsRefinements: {},
    numericRefinements: {},
    tagRefinements: [],
    hierarchicalFacetsRefinements: {},
    index: 'nxdos_docs',
    highlightPreTag: '__ais-highlight__',
    highlightPostTag: '__/ais-highlight__',
    page: 0,
    query: 'algo',
  },
} as unknown as AlgoliaSearchResults<Hit<BaseHit>>;
