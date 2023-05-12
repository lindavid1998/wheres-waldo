import { render, screen } from '@testing-library/react';
import Stopwatch from './Stopwatch';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('Stopwatch', () => {
	it('should show the time elapsed', () => {
		render(<Stopwatch />);

		expect(screen.getByText('00:00:00')).toBeInTheDocument();

		act(() => {
			jest.advanceTimersByTime(5000);
		});
		expect(screen.getByText('00:00:05')).toBeInTheDocument();

		// act(() => {
		// 	jest.advanceTimersByTime(60000);
		// });
		// expect(screen.getByText('00:01:05')).toBeInTheDocument();
	});
});
