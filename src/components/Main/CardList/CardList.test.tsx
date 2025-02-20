import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { CardList } from './CardList';
import { Character } from '@/src/types/types';

const mockCharacters: Character[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    birth_year: '41.9BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/4/',
  },
];

test('renders CardList component with characters', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CardList dataCharacters={mockCharacters} />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Darth Vader')).toBeInTheDocument();
});
