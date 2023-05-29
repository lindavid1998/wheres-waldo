import { render, screen } from '@testing-library/react';
import Stopwatch from './Stopwatch';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

jest.useFakeTimers();

describe('Stopwatch', () => {
  it('should show the time elapsed', () => {
    render(
      <Provider store={store}>
        <Stopwatch />
      </Provider>
    );

    expect(screen.getByText('00:00:00')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText('00:00:05')).toBeInTheDocument();
  });
});
