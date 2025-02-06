import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getData } from '@utilits/getData';
import { Main } from './Main';
import { vi } from 'vitest';

vi.mock('@utilits/getData', () => ({
  getData: vi.fn(() =>
    Promise.resolve({ results: [{ name: 'Luke Skywalker' }] })
  ),
}));

test('renders Main component', () => {
  render(<Main />);
  expect(screen.getByText('Throw Error')).toBeInTheDocument();
});

test('handles search and displays results', async () => {
  render(<Main />);
  const input = screen.getByPlaceholderText('Name...');
  fireEvent.change(input, { target: { value: 'Luke' } });
  const button = screen.getByText('Search');
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});

test('displays error message on request error', async () => {
  vi.mocked(getData).mockImplementationOnce(() =>
    Promise.reject(new Error('Request failed'))
  );
  render(<Main />);
  const input = screen.getByPlaceholderText('Name...');
  fireEvent.change(input, { target: { value: 'Luke' } });
  const button = screen.getByText('Search');
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('Request Error')).toBeInTheDocument();
  });
});

test('throws error when throwError is true', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => {
    render(<Main />);
    fireEvent.click(screen.getByText('Throw Error'));
  }).toThrow('Test error');
  consoleError.mockRestore();
});
