import { Component, ReactNode } from 'react';
import { Card } from './Card/Card';
import { Character } from '../../../types/types';
import './CardList.css';

interface CardListProps {
  dataCharacters: Character[];
}

export class CardList extends Component<CardListProps> {
  render(): ReactNode {
    return (
      <section className="card-list">
        <h2 className="card-list__title">Result:</h2>
        <div className="card-list__cards">
          {this.props.dataCharacters.map((character, index) => (
            <Card key={index} {...character} />
          ))}
        </div>
      </section>
    );
  }
}
