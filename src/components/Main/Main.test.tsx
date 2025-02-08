import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getData } from '@utilits/getData';
import { Main } from './Main';
import { vi } from 'vitest';

vi.mock('@utilits/getData', () => ({
  getData: vi.fn(() =>
    Promise.resolve({ results: [{ name: 'Luke Skywalker' }], count: 1 })
  ),
}));

test('renders Main component', () => {
  render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );
  expect(screen.getByText('Throw Error')).toBeInTheDocument();
});

test('handles search and displays results', async () => {
  render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );
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
  render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );
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
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Throw Error'));
  }).toThrow('Test error');
  consoleError.mockRestore();
});

test('handles pagination', async () => {
  render(
    <MemoryRouter initialEntries={['/?page=1']}>
      <Main />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);

  await waitFor(() => {
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
