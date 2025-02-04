import { Component, ReactNode } from 'react';
import { Search } from './Search/Search';
import { CardList } from './CardList/CardList';
import { getData } from '../../utilits/getData';
import { ResponseStarWars, Character } from '../../types/types';
import './Main.css';

interface MainState {
  URL: string;
  dataCharacters: Character[];
  loading: boolean;
  errorRequest: boolean;
  throwError: boolean;
}

export class Main extends Component {
  state: MainState = {
    URL: 'https://swapi.dev/api/people/?search=',
    dataCharacters: [],
    loading: false,
    errorRequest: false,
    throwError: false,
  };

  nameRequest = (name: string): void => {
    this.setState({ loading: true });
    getData<ResponseStarWars>(`${this.state.URL}${name}`)
      .then((dataRequest) => {
        this.setState({
          dataCharacters: dataRequest.results,
        });
      })
      .catch((error: Error) => {
        console.error('Data retrieval error:', error);
        this.setState({ errorRequest: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  throwError = () => {
    this.setState({ throwError: true });
  };

  render(): ReactNode {
    if (this.state.throwError) {
      throw new Error('Test error');
    }
    return (
      <main className="main">
        <article className="search-list">
          <Search nameRequest={this.nameRequest} />
          <section className="search-list__test-error">
            <button
              className="search-list__button-error"
              onClick={this.throwError}
            >
              Throw Error
            </button>
          </section>
          {this.state.loading ? (
            <div className="search-list__spinner"></div>
          ) : this.state.errorRequest ? (
            <h2 className="search-list__error-message">Request Error</h2>
          ) : (
            <CardList dataCharacters={this.state.dataCharacters} />
          )}
        </article>
      </main>
    );
  }
}
