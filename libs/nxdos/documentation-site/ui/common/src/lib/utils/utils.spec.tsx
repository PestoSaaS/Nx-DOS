import { act, render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { getColorThemeStyles } from './color-theme';
import { Fence, Heading } from '@nxdos/documentation-site/ui/markdoc';
import { handleCodeFenceCopy, handleAnchorLinkCopy } from './copy-to-clipboard';
import { AnimationTimer, iterateTimer } from './randomized-animations';

describe('Nxdos - Documentation Site - UI - Common - utils, ', () => {
  const user = userEvent.setup();

  describe('color-theme', () => {
    it('should return RGB styles', async () => {
      const colorThemeStyles = getColorThemeStyles([50, 100, 150]);
      expect(colorThemeStyles.includes('--theme-red-hue--input: 50;'));
      expect(colorThemeStyles.includes('--theme-green-hue--input: 100;'));
      expect(colorThemeStyles.includes('--theme-blue-hue--input: 150;'));
    });

    it('should return override styles if requested', async () => {
      const colorThemeStyles = getColorThemeStyles([50, 100, 150], true);
      expect(
        colorThemeStyles.includes('--theme-red-hue--input: 50 !important;')
      );
      expect(
        colorThemeStyles.includes('--theme-green-hue--input: 100 !important;')
      );
      expect(
        colorThemeStyles.includes('--theme-blue-hue--input: 150 !important;')
      );
    });
  });

  describe('copy-to-clipboard', () => {
    let baseElement: HTMLElement;
    const mock_copyToClipboard = {
      execCommand: (commandId: string) => {
        return commandId === 'copy';
      },
    };
    const spyFunction = jest.spyOn(mock_copyToClipboard, 'execCommand');
    beforeEach(async () => {
      const testFence_language = 'json{2:3}';
      const testFence_children = `[
          {
            "name": "Nx-DOS",
            "path": "nxdos",
            "isFolder": true,
            "itemList": [
              {
                "name": "introduction",
                "path": "nxdos/introduction",
                "overrideURL": "introduction"
              },
              {
                "name": "getting-started",
                "path": "nxdos/getting-started",
                "overrideURL": "getting-started"
              }
            ]
          }
        ]`;

      await act(() => {
        ({ baseElement } = render(
          <Fence language={testFence_language}>{testFence_children}</Fence>
        ));
      });
      document.execCommand = mock_copyToClipboard.execCommand;
    });

    it('should successfully add copied content to clipboard', async () => {
      expect(baseElement).toBeTruthy();
      document.querySelectorAll('.copyIcon').forEach((element) => {
        element.addEventListener('click', handleCodeFenceCopy, {
          passive: true,
        });
      });

      const copyButton = await screen.findByTestId('copyToClipboardButton');
      await user.click(copyButton);
      document.querySelectorAll('.copyIcon').forEach((element) => {
        element.removeEventListener('click', handleCodeFenceCopy);
      });
      expect(spyFunction).toHaveBeenCalledWith('copy');
    });
  });

  describe('copy-heading-anchor', () => {
    let baseElement: HTMLElement;
    const mock_copyToClipboard = {
      execCommand: (commandId: string) => {
        return commandId === 'copy';
      },
    };
    const spyFunction = jest.spyOn(mock_copyToClipboard, 'execCommand');
    beforeEach(async () => {
      const testHeading_props = {
        level: 2,
        componentType: 'Heading' as const,
        id: 'whats-jamstack',
        children: "What's Jamstack?",
        className: 'test-heading',
      };

      await act(() => {
        ({ baseElement } = render(<Heading {...testHeading_props} />));
      });
      document.execCommand = mock_copyToClipboard.execCommand;
    });

    it('should successfully add copied anchor link to clipboard', async () => {
      expect(baseElement).toBeTruthy();
      document
        .querySelectorAll('.anchorLinkClipboardIcon')
        .forEach((element) => {
          element.addEventListener('click', handleAnchorLinkCopy, {
            passive: true,
          });
        });

      const copyButton = await screen.findByTestId('copyAnchorlinkButton');
      await user.click(copyButton);
      document
        .querySelectorAll('.anchorLinkClipboardIcon')
        .forEach((element) => {
          element.removeEventListener('click', handleAnchorLinkCopy);
        });
      expect(spyFunction).toHaveBeenCalledWith('copy');
    });
  });

  describe('randomized-animations', () => {
    const flickerAnimationTimer: AnimationTimer = {
      // Animation distribution
      mean: 50,
      stdDev: 750,
      skew: 100,
      minRange: 300,
      maxRange: 4000,
      callback: () => {
        return;
      },
    };

    it('should instantiate a valid idle timer', async () => {
      expect(
        typeof flickerAnimationTimer.duration === 'undefined'
      ).toBeTruthy();
    });

    it('should successfully iterate timers with provided distribution', async () => {
      iterateTimer(flickerAnimationTimer);
      expect(typeof flickerAnimationTimer.duration === 'undefined').toBeFalsy();
      const firstIterationDuration = flickerAnimationTimer.duration as number;
      iterateTimer(flickerAnimationTimer);
      const secondIterationDuration = flickerAnimationTimer.duration as number;
      iterateTimer(flickerAnimationTimer);
      const thirdIterationDuration = flickerAnimationTimer.duration as number;
      expect(
        firstIterationDuration === secondIterationDuration &&
          secondIterationDuration === thirdIterationDuration
      ).toBeFalsy();
      expect(
        firstIterationDuration < flickerAnimationTimer.maxRange &&
          firstIterationDuration > flickerAnimationTimer.minRange &&
          secondIterationDuration < flickerAnimationTimer.maxRange &&
          secondIterationDuration > flickerAnimationTimer.minRange
      );
    });
  });
});
