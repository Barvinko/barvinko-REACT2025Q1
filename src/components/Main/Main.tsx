import { Component, ReactNode } from 'react';
import { Search } from './Search/Search';
import { CardList } from './CardList/CardList';

export class Main extends Component {
  render(): ReactNode {
    return (
      <main>
        <Search />
        <CardList />
      </main>
    );
  }
}
