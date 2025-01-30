import { Component, ReactNode } from 'react';
import './Search.css';

export class Search extends Component {
  render(): ReactNode {
    return (
      <section className="search">
        <input className="search__input" type="search" placeholder="Name..." />
        <button>Search</button>
      </section>
    );
  }
}
