import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import {
	getImgDimensions,
	convertTargetBoundaryToPixels,
	isInputWithinBoundary,
} from './utils/helpers';
import '@testing-library/jest-dom';
import 'jest-styled-components';

jest.mock('./utils/helpers', () => ({
	getImgDimensions: jest.fn(),
	convertTargetBoundaryToPixels: jest.fn(),
	isInputWithinBoundary: jest.fn(),
}));

describe('App', () => {
	it('should update icons in progress bar based on whether the answer is correct', async () => {
		const user = userEvent.setup();
		getImgDimensions.mockReturnValue({});
		convertTargetBoundaryToPixels.mockReturnValue({});
		isInputWithinBoundary.mockReturnValue(false);

		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		expect(screen.getByText('R2D2')).toHaveStyleRule(
			'color',
			'var(--text-color)'
		);

		user.click(screen.getByTestId('game-image'));
		await waitFor(() => {
			expect(screen.getByTestId('AnswerBox')).toBeInTheDocument();
		});
		user.click(within(screen.getByTestId('AnswerBox')).getByText('R2D2'));

		await waitFor(() => {
			expect(screen.getByText('R2D2')).toHaveStyleRule(
				'color',
				'var(--text-color)'
			);
		});

		isInputWithinBoundary.mockReturnValue(true);

		user.click(screen.getByTestId('game-image'));
		await waitFor(() => {
			expect(screen.getByTestId('AnswerBox')).toBeInTheDocument();
		});
		user.click(within(screen.getByTestId('AnswerBox')).getByText('R2D2'));

		await waitFor(() => {
			expect(screen.getByText('R2D2')).toHaveStyleRule(
				'color',
				'var(--success-color)'
			);
		});
	});
});
