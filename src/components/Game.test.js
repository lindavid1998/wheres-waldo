import Game from './Game';
import {
	render,
	screen,
	waitForElementToBeRemoved,
	waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '@testing-library/jest-dom';

describe('Game', () => {
	let playMock;

	beforeAll(() => {
		playMock = jest
			.spyOn(HTMLMediaElement.prototype, 'play')
			.mockImplementation(() => {});
	});

	afterAll(() => {
		playMock.mockRestore();
	});

	it('should show the answer box when the image is clicked', async () => {
		const user = userEvent.setup();
		render(
			<Provider store={store}>
				<Game />
			</Provider>
		);

		expect(screen.queryByTestId('AnswerBox')).toBeNull();
		await act(async () => {
			await user.click(screen.getByTestId('game-image'));
		});
		expect(screen.getByTestId('AnswerBox')).toBeTruthy();

		// any way to test position of the answer box? it should be where the user clicked
	});

	it('should hide the answer box after an answer has been submitted', async () => {
		const user = userEvent.setup();
		render(
			<Provider store={store}>
				<Game />
			</Provider>
		);
		user.click(screen.getByTestId('game-image'));
		user.click(screen.getByText('R2D2'));
		await waitForElementToBeRemoved(() => screen.queryByTestId('AnswerBox'));
	});

	it('should hide the answer box if Escape is keyed in', async () => {
		const user = userEvent.setup();
		render(
			<Provider store={store}>
				<Game />
			</Provider>
		);
		user.click(screen.getByTestId('game-image'));
		await waitFor(() => screen.findByTestId('AnswerBox'));
		userEvent.keyboard('[Escape]');
		await waitForElementToBeRemoved(() => screen.queryByTestId('AnswerBox'));
	});
});
