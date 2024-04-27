import { Dispatch, SetStateAction } from 'react';

export interface PanelState {
  isOpen: boolean;
  queueNextState: Dispatch<SetStateAction<boolean>>;
}
