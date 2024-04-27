import { Banner } from '@nxdos/documentation-site/ui/common';

const BANNER_TITLE = 'Nx starter guide';
const BANNER_CAPTION =
  'OSS stack template for multiplatform apps, curated with micro SaaS projects in mind.';
const SECTIONS = [
  {
    sectionInset: '',
    sectionTitle: 'pre-release / contributions welcome',
    anchorLink: '/acknowledgements#contributing',
  },
];

export function Index() {
  return (
    <Banner
      titleText={BANNER_TITLE}
      captionText={BANNER_CAPTION}
      sections={SECTIONS}
    />
  );
}

export default Index;
