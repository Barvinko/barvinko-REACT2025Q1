import { Component, ReactNode } from 'react';
import './CardList.css';

export class CardList extends Component {
  render(): ReactNode {
    return (
      <section className="class-list">
        <h2 className="class-list__title">Result:</h2>
      </section>
    );
  }
}
