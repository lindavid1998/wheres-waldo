import { render, screen } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';

jest.useFakeTimers();

describe('Header', () => {
	it('should show the time elapsed', () => {
		render(
			<Provider store={store}>
				<Header />
			</Provider>,
			{ wrapper: BrowserRouter }
		);

		expect(screen.getByText('00:00:00')).toBeInTheDocument();

		act(() => {
			jest.advanceTimersByTime(5000);
		});
		expect(screen.getByText('00:00:05')).toBeInTheDocument();
	});
});
