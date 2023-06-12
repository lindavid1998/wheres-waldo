import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { isInputWithinBoundary } from './utils/helpers';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { act } from 'react-dom/test-utils';

jest.mock('./utils/helpers', () => ({
	getImgDimensions: jest.fn(),
	convertTargetBoundaryToPixels: jest.fn(),
	isInputWithinBoundary: jest.fn(),
  convertSecondsToHMS: jest.fn(),
}));

jest.useFakeTimers();

const clickOnAnswer = async (answer) => {
  const user = userEvent.setup();
  user.click(screen.getByTestId('game-image'));
  await waitFor(() => {
    expect(screen.getByTestId('AnswerBox')).toBeInTheDocument();
  });
  user.click(within(screen.getByTestId('AnswerBox')).getByText(answer));
};

describe('App', () => {
  it('should update icons in progress bar based on whether the answer is correct', async () => {
    isInputWithinBoundary.mockReturnValueOnce(false).mockReturnValueOnce(true);
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await clickOnAnswer('R2D2');
    await waitFor(() => {
      expect(screen.getByText('R2D2')).toHaveStyleRule(
        'color',
        'var(--text-color)'
      );
    });

    await clickOnAnswer('R2D2');
    await waitFor(() => {
      expect(screen.getByText('R2D2')).toHaveStyleRule(
        'color',
        'var(--success-color)'
      );
    });
  });

  it('should stop the stopwatch when all targets have been found', async () => {
    isInputWithinBoundary.mockReturnValue(true);
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const stopwatch = screen.getByTestId('stopwatch');
    const timeBefore = stopwatch.textContent;

    const answers = ['R2D2', 'Finn', 'Han Solo'];
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      await clickOnAnswer(answer);
      await waitFor(() => {
        expect(screen.getByText(answer)).toHaveStyleRule(
          'color',
          'var(--success-color)'
        );
      });
    }

    act(() => {
      jest.advanceTimersByTime(30000);
    });
    expect(stopwatch.textContent).toEqual(timeBefore);
  });
});
