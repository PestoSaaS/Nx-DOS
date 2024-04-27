import {
  UserFlowInteractionsFn,
  UserFlowContext,
  UserFlowProvider,
} from '@push-based/user-flow';

// Your custom interactions with the page
const interactions: UserFlowInteractionsFn = async (
  ctx: UserFlowContext
): Promise<void> => {
  const { flow, collectOptions } = ctx;
  const { url } = collectOptions;

  // Navigate to URL
  await flow.navigate(url, {
    stepName: `Navigate to ${url}`,
  });
};

const userFlowProvider: UserFlowProvider = {
  flowOptions: { name: 'Nx-DOS docs - basic navigation' },
  interactions,
};

module.exports = userFlowProvider;
