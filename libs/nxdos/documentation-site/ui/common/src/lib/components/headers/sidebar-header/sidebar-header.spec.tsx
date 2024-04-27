import { act, render, screen } from '@testing-library/react';
import { SidebarHeader } from './sidebar-header';
import mockRouter from 'next-router-mock';
import {
  InstantSearchHooksTestWrapper,
  mock_panelStates,
} from '@shared/util/testing';
import {
  ThemeContextProvider,
  useThemeContext,
} from '../../../utils/theme-context-provider';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Nxdos - Documentation Site - UI - Common - components, SidebarHeader', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  // Set the initial url:
  mockRouter.push('/introduction');
  const user = userEvent.setup();

  let panelStates: ReturnType<typeof mock_panelStates>;
  let themeState: ReturnType<typeof useThemeContext>;

  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    themeState = useThemeContext();
    return <div>{children}</div>;
  };

  beforeEach(
    async () =>
      await act(() => {
        panelStates = mock_panelStates();
        ({ baseElement, asFragment } = render(
          <ThemeContextProvider>
            <InstantSearchHooksTestWrapper>
              <TestWrapper>
                <SidebarHeader panelStates={panelStates} />
              </TestWrapper>
            </InstantSearchHooksTestWrapper>
          </ThemeContextProvider>
        ));
      })
  );

  it('should render SidebarHeader component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const sidebarHeaderLabel = await screen.findByText('Nx starter guide', {
      exact: false,
    });
    expect(sidebarHeaderLabel).toBeTruthy();
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('should toggle sidebar on click to upper section of logo', async () => {
    const sidebarHeaderClickHandler__toggle = await screen.findByTestId(
      'sidebarHeaderClickHandler--toggle'
    );
    expect(panelStates.sidebarState.isOpen).toBeFalsy();
    await user.click(sidebarHeaderClickHandler__toggle);
    expect(panelStates.sidebarState.isOpen).toBeTruthy();
  });

  it('should change color theme on click to lower section of logo', async () => {
    const sidebarHeaderClickHandler__changeTheme = await screen.findByTestId(
      'sidebarHeaderClickHandler--changeTheme'
    );
    const colorTheme_beforeClick = themeState.selectedThemes.defaultTheme;
    await user.click(sidebarHeaderClickHandler__changeTheme);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const colorTheme_afterClick = themeState.selectedThemes.defaultTheme;
    expect(colorTheme_beforeClick).not.toEqual(colorTheme_afterClick);
  });
});
