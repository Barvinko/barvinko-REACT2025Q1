import { useState, useEffect, useCallback } from 'react';
import { Search } from './Search/Search';
import { CardList } from './CardList/CardList';
import { getData } from '@utilits/getData';
import { ResponseStarWars, Character } from '@/src/types/types';
import './Main.css';

export const Main = () => {
  const _URL = 'https://swapi.dev/api/people/?search=';

  const [dataCharacters, setDataCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorRequest, setErrorRequest] = useState<boolean>(false);
  const [throwError, setThrowError] = useState<boolean>(false);

  const nameRequest = useCallback(
    (name: string): void => {
      setLoading(true);
      getData<ResponseStarWars>(`${_URL}${name}`)
        .then((dataRequest) => {
          setDataCharacters(dataRequest.results);
        })
        .catch((error: Error) => {
          console.error('Data retrieval error:', error);
          setErrorRequest(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [_URL]
  );

  useEffect(() => {
    if (throwError) {
      throw new Error('Test error');
    }
  }, [throwError]);

  return (
    <main className="main">
      <article className="search-list">
        <Search nameRequest={nameRequest} />
        <section className="search-list__test-error">
          <button
            className="search-list__button-error"
            onClick={() => setThrowError(true)}
          >
            Throw Error
          </button>
        </section>
        {loading ? (
          <div className="search-list__spinner"></div>
        ) : errorRequest ? (
          <h2 className="search-list__error-message">Request Error</h2>
        ) : (
          <CardList dataCharacters={dataCharacters} />
        )}
      </article>
    </main>
  );
};
