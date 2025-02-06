import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { Character } from '@/src/types/types';

const mockCharacter: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};

test('renders Card component with character details', () => {
  render(<Card {...mockCharacter} />);
  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
  expect(screen.getByText('Gender: male')).toBeInTheDocument();
  expect(screen.getByText('Height: 172')).toBeInTheDocument();
  expect(screen.getByText('Mass: 77')).toBeInTheDocument();
  expect(screen.getByText('Link')).toHaveAttribute(
    'href',
    'https://swapi.dev/api/people/1/'
  );
});
