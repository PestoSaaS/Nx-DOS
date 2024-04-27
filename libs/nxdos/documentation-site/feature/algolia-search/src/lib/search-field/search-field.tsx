import { FormEvent, FormEventHandler } from 'react';
import styles from './search-field.module.css';
import { SearchBox } from 'react-instantsearch';
import { PanelState } from '@nxdos/documentation-site/ui/common';

const Separator = () => {
  const separatorString = '\u2592'.repeat(29);
  return <div className={styles['separator']}>{separatorString}</div>;
};

interface SearchFieldProps {
  panelStates: {
    sidebarState: PanelState;
    searchPanelState: PanelState;
    overviewPanelState: PanelState;
  };
}

export const SearchField = (props: SearchFieldProps) => {
  let timerId: NodeJS.Timeout | undefined = undefined;
  let timerCallback: ((query: string) => void) | undefined = undefined;

  const SEARCH_TYPING_TIMEOUT_DURATION = 400;

  const searchQueryHook = (query: string, search: (query: string) => void) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    if (query === '') {
      props.panelStates.searchPanelState.queueNextState(false);
      setTimeout(() => {
        search(query);
      }, 250);
    } else {
      if (typeof timerCallback === 'undefined') {
        timerCallback = search;
      }
      timerId = setTimeout(() => {
        search(query);
        const appWrapper = document.getElementsByClassName('appWrapper')[0];
        const breakpointSwitchFromDom = getComputedStyle(
          appWrapper
        ).getPropertyValue('--view-breakpoint-switch-sm');

        if (
          Number(breakpointSwitchFromDom) === 1 &&
          !props.panelStates.searchPanelState.isOpen
        ) {
          props.panelStates.searchPanelState.queueNextState(true);
        }
      }, SEARCH_TYPING_TIMEOUT_DURATION);
    }
  };

  const submitHandler: FormEventHandler<HTMLElement> = (event: FormEvent) => {
    event.preventDefault();
    const appWrapper = document.getElementsByClassName('appWrapper')[0];
    const breakpointSwitchFromDom = getComputedStyle(
      appWrapper
    ).getPropertyValue('--view-breakpoint-switch-sm');

    const searchField = (event.target as HTMLElement).getElementsByTagName(
      'input'
    )[0]
      ? (event.target as HTMLElement).getElementsByTagName('input')[0]
      : document.getElementsByClassName('searchField')[0];

    const queryString = searchField.getAttribute('value') || '';
    const hitsIndicator = document.getElementsByClassName('hitsIndicator')[0];

    if (timerId) {
      clearTimeout(timerId);
      if (typeof timerCallback !== 'undefined') {
        timerCallback(queryString);
      }

      setTimeout(() => {
        /* istanbul ignore else */
        if (Number(breakpointSwitchFromDom) !== 1) {
          if (typeof hitsIndicator !== 'undefined') {
            props.panelStates.searchPanelState.queueNextState(
              !props.panelStates.searchPanelState.isOpen
            );
          }
        } else {
          const wasSidebarOpen = props.panelStates.sidebarState.isOpen;
          if (wasSidebarOpen) {
            props.panelStates.sidebarState.queueNextState(false);
            if (queryString === '') {
              props.panelStates.searchPanelState.queueNextState(false);
            } else {
              if (typeof hitsIndicator === 'undefined') {
                setTimeout(() => {
                  props.panelStates.searchPanelState.queueNextState(false);
                }, 50);
              }
            }
          } else {
            if (
              typeof timerCallback === 'undefined' ||
              process.env['NX_TASK_TARGET_TARGET'] === 'test'
            ) {
              props.panelStates.searchPanelState.queueNextState(
                !props.panelStates.searchPanelState.isOpen
              );
            }
          }
        }
      }, 350);
    } else {
      if (Number(breakpointSwitchFromDom) !== 1) {
        if (typeof hitsIndicator !== 'undefined') {
          props.panelStates.searchPanelState.queueNextState(
            !props.panelStates.searchPanelState.isOpen
          );
        }
      } else {
        const wasSidebarOpen = props.panelStates.searchPanelState.isOpen;
        if (wasSidebarOpen) {
          props.panelStates.sidebarState.queueNextState(false);
          if (queryString === '') {
            props.panelStates.searchPanelState.queueNextState(false);
          } else {
            const hitsIndicator =
              document.getElementsByClassName('hitsIndicator')[0];
            if (typeof hitsIndicator === 'undefined') {
              setTimeout(() => {
                props.panelStates.searchPanelState.queueNextState(false);
              }, 50);
            }
          }
        } else {
          if (
            typeof timerCallback === 'undefined' ||
            process.env['NX_TASK_TARGET_TARGET'] === 'test'
          ) {
            if (queryString === '') {
              props.panelStates.searchPanelState.queueNextState(false);
            } else {
              props.panelStates.searchPanelState.queueNextState(
                !props.panelStates.searchPanelState.isOpen
              );
            }
          }
        }
      }
    }
    setTimeout(() => {
      const searchField = (event.target as HTMLElement).getElementsByTagName(
        'input'
      )[0]
        ? (event.target as HTMLElement).getElementsByTagName('input')[0]
        : (document.getElementsByClassName(
            'searchField'
          )[0] as HTMLInputElement);
      searchField.focus();
    }, 1);
  };

  return (
    <div className={styles['searchComponentFrame']}>
      <div className={styles['searchComponentFrameBg']} />
      <Separator />
      <div className={styles['searchComponentCore']}>
        <div className={styles['asciiBorder']}>{'\u2592\u2592'}</div>
        <div className={styles['searchFieldSpacer']}>
          {process.env['NEXT_PUBLIC_ALGOLIA_PROJECT_APP_ID'] &&
            process.env['NEXT_PUBLIC_ALGOLIA_PROJECT_SEARCH_ONLY_API_KEY'] && (
              <SearchBox
                placeholder={'search'}
                queryHook={searchQueryHook}
                onSubmit={submitHandler}
                classNames={{
                  form: styles['searchFieldFrame'],
                  input: styles['searchField'] + ' searchField',
                  submit: styles['searchFieldSubmitButton'],
                  submitIcon: styles['searchFieldIcon'],
                  reset: styles['searchFieldResetButton'],
                  resetIcon: styles['searchFieldResetIcon'],
                }}
              />
            )}
        </div>
        <div className={styles['asciiBorder']}>{'\u2592\u2592'}</div>
      </div>
      <Separator />
    </div>
  );
};
