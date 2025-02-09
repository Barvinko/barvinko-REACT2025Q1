import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Details } from './Details';
import { getData } from '@utilits/getData';
import { vi } from 'vitest';

vi.mock('@utilits/getData', () => ({
  getData: vi.fn(() =>
    Promise.resolve({
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      height: '172',
      mass: '77',
    })
  ),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

test('renders Details component and fetches character data', async () => {
  render(
    <MemoryRouter initialEntries={['/page/1/details/1']}>
      <Routes>
        <Route path="/page/:page/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
  });
});

test('displays loading spinner while fetching data', () => {
  render(
    <MemoryRouter initialEntries={['/page/1/details/1']}>
      <Routes>
        <Route path="/page/:page/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(
    screen.getByRole('dialog').querySelector('.details__spinner')
  ).toBeInTheDocument();
});

test('displays error message if character data is not available', async () => {
  vi.mocked(getData).mockImplementationOnce(() =>
    Promise.reject(new Error('Error fetching data'))
  );
  render(
    <MemoryRouter initialEntries={['/page/1/details/1']}>
      <Routes>
        <Route path="/page/:page/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByText('No character details available.')
    ).toBeInTheDocument();
  });
});

test('closes modal and navigates to page on handleClose', () => {
  const navigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(navigate);

  render(
    <MemoryRouter initialEntries={['/page/1/details/1']}>
      <Routes>
        <Route path="/page/:page/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('Close'));
  expect(navigate).toHaveBeenCalledWith('/page/1');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
