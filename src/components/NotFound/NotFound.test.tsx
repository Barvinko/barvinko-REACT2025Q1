import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from './NotFound';

test('renders NotFound component', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  expect(screen.getByText('Go to Home')).toBeInTheDocument();
});
