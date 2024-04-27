import { build_documentation_sitemap } from './build-documentation-sitemap-for-e2e';

export default async function runExecutor() {
  await build_documentation_sitemap();
  console.log('"build-documentation-sitemap" executor completed');

  return {
    success: true,
  };
}
