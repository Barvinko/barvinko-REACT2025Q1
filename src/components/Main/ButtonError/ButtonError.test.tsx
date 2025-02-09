import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonError } from './ButtonError';
import { vi } from 'vitest';

test('throws error when button is clicked', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => {
    render(<ButtonError />);
    fireEvent.click(screen.getByText('Throw Error'));
  }).toThrow('Test error');
  consoleError.mockRestore();
});
