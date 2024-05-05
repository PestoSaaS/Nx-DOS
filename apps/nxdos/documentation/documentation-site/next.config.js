//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output:
    process.env.NEXT_BUILD_OUTPUT_MODE === 'standalone'
      ? 'standalone'
      : process.env.NEXT_BUILD_OUTPUT_MODE === 'export'
      ? 'export'
      : undefined,
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // prepare records for algolia before building
      const fs = require('fs');
      const { workspaceRoot } = require('@nx/devkit');

      let outputFolderPath = '';
      const relativePath = '/apps/nxdos/documentation/documentation-site';
      if (process.env['NX_TASK_TARGET_CONFIGURATION'] === 'production') {
        outputFolderPath = workspaceRoot + '/dist' + relativePath + '/algolia';
      } else {
        outputFolderPath =
          workspaceRoot + '/dist/dev' + relativePath + '/algolia';
      }
      if (!fs.existsSync(outputFolderPath)) {
        fs.mkdirSync(outputFolderPath, { recursive: true });
      }
      // reset data store of parsed searchable sections for a fresh crawl
      fs.writeFileSync(
        outputFolderPath + '/sections.json',
        JSON.stringify([], null, 4)
      );
    }
    // parse the rule for SVGs defined by nx config
    const nxSvgRule = config.module.rules.find(
      (/** @type {{ test: any; }} */ rule) =>
        rule.test && String(rule.test) === String(/\.svg$/i)
    );
    // remove the existing SVG rule
    const ruleIndex = config.module.rules.indexOf(nxSvgRule);
    config.module.rules.splice(ruleIndex);
    // insert preferred config instead
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        // If coming from JS/TS file, then transform into React component using SVGR.
        {
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: require.resolve('@svgr/webpack'),
              options: {
                svgo: false,
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000, // 10kB
                name: '[name].[hash:7].[ext]',
              },
            },
          ],
        },
        // Fallback to plain URL loader if someone just imports the SVG and references it on the <img src> tag
        {
          type: 'asset/resource',
        },
      ],
    });

    return config;
  },
  experimental: {
    largePageDataBytes: 512 * 100000,
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

const withBundleAnalyzer = process.env['CONTAINER_BUILD']
  ? null
  : require('@next/bundle-analyzer')({
      enabled: process.env['ANALYZE'] === 'true',
    });

const plugins =
  withBundleAnalyzer !== null
    ? [
        // Add more Next.js plugins to this list if needed.
        withNx,
        withBundleAnalyzer,
      ]
    : [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
