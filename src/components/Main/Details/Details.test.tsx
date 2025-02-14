import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { Details } from './Details';
import { vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('https://swapi.dev/api/people/:id', async ({ params }) => {
    if (params.id === '1') {
      return HttpResponse.json({
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
      });
    }
    return HttpResponse.json({ detail: 'Not found' }, { status: 404 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

test('renders Details component and fetches character data', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/page/1/details/1']}>
        <Routes>
          <Route path="/page/:page/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
  expect(screen.getByText('Gender: male')).toBeInTheDocument();
  expect(screen.getByText('Height: 172')).toBeInTheDocument();
  expect(screen.getByText('Mass: 77')).toBeInTheDocument();
});

test('displays error message if character data is not available', async () => {
  server.use(
    http.get('https://swapi.dev/api/people/:id', async () =>
      HttpResponse.json({ detail: 'Not found' }, { status: 404 })
    )
  );

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/page/1/details/2']}>
        <Routes>
          <Route path="/page/:page/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(
    await screen.findByText('No character details available.')
  ).toBeInTheDocument();
});

test('closes modal and navigates to page on handleClose', () => {
  const navigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(navigate);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/page/1/details/1']}>
        <Routes>
          <Route path="/page/:page/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(screen.getByText('Close'));
  expect(navigate).toHaveBeenCalledWith('/page/1');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
