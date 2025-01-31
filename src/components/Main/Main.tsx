import { Component, ReactNode } from 'react';
import { Search } from './Search/Search';
import { CardList } from './CardList/CardList';
import { getData } from '../../utilits/getData';
import { ResponseStarWars, Character } from '../../types/types';

export class Main extends Component {
  state = {
    URL: 'https://swapi.dev/api/people/?search=',
    dataCharacters: [] as Character[],
    loading: false,
  };

  nameRequest = (name: string): void => {
    this.setState({ loading: true });
    console.log('Data loading:', `${this.state.URL}${name}`);
    getData<ResponseStarWars>(`${this.state.URL}${name}`)
      .then((dataRequest) => {
        this.setState({
          dataCharacters: dataRequest.results,
        });
      })
      .catch((error) => {
        console.error('Data retrieval error:', error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render(): ReactNode {
    return (
      <main>
        <article>
          <Search nameRequest={this.nameRequest} />
          <CardList dataCharacters={this.state.dataCharacters} />
        </article>
      </main>
    );
  }
}
