import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Search } from './Search';
import { vi } from 'vitest';

test('renders Search component and handles input', () => {
  const mockNameRequest = vi.fn();
  render(
    <MemoryRouter>
      <Search nameRequest={mockNameRequest} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Name...');
  fireEvent.change(input, { target: { value: 'Luke' } });
  expect(input).toHaveValue('Luke');

  const button = screen.getByText('Search');
  fireEvent.click(button);
  expect(mockNameRequest).toHaveBeenCalledWith('Luke', 1);
});

test('displays error message for invalid input', () => {
  render(
    <MemoryRouter>
      <Search nameRequest={vi.fn()} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Name...');
  fireEvent.change(input, { target: { value: 'Luke@' } });
  expect(
    screen.getByText('Only letters, numbers, spaces, and hyphens are allowed.')
  ).toBeInTheDocument();
});
