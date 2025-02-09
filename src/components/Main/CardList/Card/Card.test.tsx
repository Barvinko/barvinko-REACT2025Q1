import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Card } from './Card';
import { Character } from '@/src/types/types';
import { vi } from 'vitest';

const mockCharacter: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

test('renders Card component with character name', () => {
  render(
    <MemoryRouter initialEntries={['/page/1']}>
      <Routes>
        <Route path="/page/:page" element={<Card {...mockCharacter} />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
});

test('navigates to details page on click', () => {
  const navigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(navigate);

  render(
    <MemoryRouter initialEntries={['/page/1']}>
      <Routes>
        <Route path="/page/:page" element={<Card {...mockCharacter} />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('Luke Skywalker'));
  expect(navigate).toHaveBeenCalledWith('/page/1/details/1');
});

test('does not navigate if URL is invalid', () => {
  const navigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(navigate);

  const invalidCharacter = { ...mockCharacter, url: 'invalid-url' };

  render(
    <MemoryRouter initialEntries={['/page/1']}>
      <Routes>
        <Route path="/page/:page" element={<Card {...invalidCharacter} />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('Luke Skywalker'));
  expect(navigate).not.toHaveBeenCalled();
});
