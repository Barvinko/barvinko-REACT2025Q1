import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './Search';
import { vi } from 'vitest';

test('renders Search component and handles input', () => {
  const mockNameRequest = vi.fn();
  render(<Search nameRequest={mockNameRequest} />);

  const input = screen.getByPlaceholderText('Name...');
  fireEvent.change(input, { target: { value: 'Luke' } });
  expect(input).toHaveValue('Luke');

  const button = screen.getByText('Search');
  fireEvent.click(button);
  expect(mockNameRequest).toHaveBeenCalledWith('Luke');
});

test('displays error message for invalid input', () => {
  render(<Search nameRequest={vi.fn()} />);

  const input = screen.getByPlaceholderText('Name...');
  fireEvent.change(input, { target: { value: 'Luke@' } });
  expect(
    screen.getByText('Only letters, numbers, spaces, and hyphens are allowed.')
  ).toBeInTheDocument();
});

test('loads initial value from local storage', () => {
  localStorage.setItem(
    'Barvinko-classComponents__name',
    JSON.stringify('Leia')
  );
  const mockNameRequest = vi.fn();
  render(<Search nameRequest={mockNameRequest} />);
  expect(mockNameRequest).toHaveBeenCalledWith('Leia');
});

test('calls nameRequest on mount with localName', () => {
  const mockNameRequest = vi.fn();
  localStorage.setItem(
    'Barvinko-classComponents__name',
    JSON.stringify('Leia')
  );
  render(<Search nameRequest={mockNameRequest} />);
  expect(mockNameRequest).toHaveBeenCalledWith('Leia');
});
