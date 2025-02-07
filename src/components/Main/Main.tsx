import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Search } from './Search/Search';
import { CardList } from './CardList/CardList';
import { getData } from '@utilits/getData';
import { ResponseStarWars, Character } from '@/src/types/types';
import './Main.css';

export const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get('page') || '1', 10);

  const [URL] = useState('https://swapi.dev/api/people/?search=');
  const [dataCharacters, setDataCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorRequest, setErrorRequest] = useState<boolean>(false);
  const [throwError, setThrowError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [pageCount, setPageCount] = useState<number>(0);

  const nameRequest = useCallback(
    (name: string, page: number = 1): void => {
      setLoading(true);
      getData<ResponseStarWars>(`${URL}${name}&page=${page}`)
        .then((dataRequest) => {
          setDataCharacters(dataRequest.results);
          setPageCount(Math.ceil(dataRequest.count / 10));
        })
        .catch((error: Error) => {
          console.error('Data retrieval error:', error);
          setErrorRequest(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [URL]
  );

  useEffect(() => {
    if (throwError) {
      throw new Error('Test error');
    }
  }, [throwError]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    <main className="main">
      <article className="search-list">
        <Search
          page={currentPage}
          nameRequest={nameRequest}
          handlePageChange={(value: number) =>
            handlePageChange({ selected: value })
          }
        />
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
          <>
            <CardList dataCharacters={dataCharacters} />
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
              forcePage={currentPage - 1}
            />
          </>
        )}
      </article>
    </main>
  );
};
