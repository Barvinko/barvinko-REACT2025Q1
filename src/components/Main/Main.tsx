import { useState, useCallback } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Search } from './Search/Search';
import { CardList } from './CardList/CardList';
import { ButtonError } from './ButtonError/ButtonError';
import { Spinner } from '@components/UI/Spinner/Spinner';
import { Store } from './Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetCharactersQuery } from '@store/api';
import { setSearchName } from '@store/localStorageSlice';
import './Main.scss';

export const Main = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();

  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(page || '1', 10)
  );
  const dispatch = useDispatch();
  const searchName = useSelector(
    (state: RootState) => state.localStorage.searchName
  );
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const { data, error, isFetching } = useGetCharactersQuery({
    name: searchName,
    page: currentPage,
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
    navigate(`/page/${newPage}`);
  };

  const handleSearch = useCallback(
    (name: string, page: number) => {
      dispatch(setSearchName(name));
      setCurrentPage(page);
      navigate(`/page/${page}`);
    },
    [navigate, dispatch]
  );

  return (
    <main className="main">
      <article
        className={`search-list ${selectedCards.length > 0 ? 'search-list_selected' : ''}`}
      >
        <Search nameRequest={handleSearch} />
        <ButtonError />
        {isFetching ? (
          <Spinner />
        ) : error ? (
          <h2 className="search-list__error-message">Nothing Found</h2>
        ) : (
          <div className="content">
            <div className="content__left">
              <CardList dataCharacters={data?.results || []} />
              <ReactPaginate
                previousClassName="pagination__item pagination__previous"
                nextClassName="pagination__item pagination__next"
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'pagination__item pagination__break-me'}
                pageCount={Math.ceil((data?.count || 0) / 10)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                pageClassName={'pagination__item pagination__page'}
                activeClassName={'pagination__item pagination__page_active'}
                forcePage={currentPage - 1}
              />
            </div>
            <Outlet />
          </div>
        )}
        <Store />
      </article>
    </main>
  );
};
