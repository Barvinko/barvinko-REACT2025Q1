import { Card } from './Card/Card';
import type { Character } from '@/src/types/types';
import styles from './CardList.module.scss';

interface CardListProps {
  dataCharacters: Character[];
}

export const CardList = ({ dataCharacters }: CardListProps) => {
  return (
    <section className={styles.cardList}>
      <h2 className={styles.cardList__title}>Result:</h2>
      <div className={styles.cardList__cards}>
        {dataCharacters.map((character, index) => (
          <Card key={index} {...character} />
        ))}
      </div>
    </section>
  );
};
