import { build_documentation } from '../../lib/build-docs-on-server-start';

export default async function runExecutor() {
  await build_documentation();
  console.log('"build-documentation" executor completed');

  return {
    success: true,
  };
}
