import { useState } from 'react';

export const useMockAlgoliaPaginationHook = () => {
  const [currentRefinement, refine] = useState(0);
  const nbHits = 34;
  const nbPages = 3;

  return {
    currentRefinement,
    nbHits,
    nbPages,
    refine,
  };
};
