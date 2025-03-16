import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { Main } from './Main';
import { vi } from 'vitest';
import { useGetCharactersQuery } from '@store/api';

vi.mock('@store/api', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('@store/api');
  return {
    ...actual,
    useGetCharactersQuery: vi.fn(),
  };
});

test('renders Main component', () => {
  (useGetCharactersQuery as jest.Mock).mockReturnValue({
    data: { results: [] },
    isFetching: false,
    error: null,
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText('Throw Error')).toBeInTheDocument();
});

test('handles search and displays results', async () => {
  (useGetCharactersQuery as jest.Mock).mockReturnValue({
    data: {
      results: [
        { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
      ],
    },
    isFetching: false,
    error: null,
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    </Provider>
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
  (useGetCharactersQuery as jest.Mock).mockReturnValue({
    data: null,
    isFetching: false,
    error: { status: 404 },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText('Nothing Found')).toBeInTheDocument();
  });
});

test('handles pagination', async () => {
  (useGetCharactersQuery as jest.Mock).mockReturnValue({
    data: {
      results: [
        { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
      ],
      count: 20,
    },
    isFetching: false,
    error: null,
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/page/1']}>
        <Main />
      </MemoryRouter>
    </Provider>
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

test('displays loading spinner while fetching data', () => {
  (useGetCharactersQuery as jest.Mock).mockReturnValue({
    data: null,
    isFetching: true,
    error: null,
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});
