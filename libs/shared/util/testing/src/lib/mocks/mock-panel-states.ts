import { Dispatch, SetStateAction } from 'react';

export const mock_panelStates = () => {
  const panelStates = {
    sidebarState: {
      isOpen: false,
      queueNextState: ((queuedState: boolean) => {
        panelStates.sidebarState.isOpen = queuedState;
      }) as Dispatch<SetStateAction<boolean>>,
    },
    searchPanelState: {
      isOpen: false,
      queueNextState: ((queuedState: boolean) => {
        panelStates.searchPanelState.isOpen = queuedState;
      }) as Dispatch<SetStateAction<boolean>>,
    },
    overviewPanelState: {
      isOpen: false,
      queueNextState: ((queuedState: boolean) => {
        panelStates.overviewPanelState.isOpen = queuedState;
      }) as Dispatch<SetStateAction<boolean>>,
    },
  };
  return panelStates;
};
