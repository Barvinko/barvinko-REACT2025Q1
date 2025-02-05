import { Card } from './Card/Card';
import type { Character } from '@/src/types/types';
import './CardList.css';

interface CardListProps {
  dataCharacters: Character[];
}

export const CardList = ({ dataCharacters }: CardListProps) => {
  return (
    <section className="card-list">
      <h2 className="card-list__title">Result:</h2>
      <div className="card-list__cards">
        {dataCharacters.map((character, index) => (
          <Card key={index} {...character} />
        ))}
      </div>
    </section>
  );
};
