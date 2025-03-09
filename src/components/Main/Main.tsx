import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
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
import styles from './Main.module.scss';

export const Main = () => {
  const router = useRouter();
  const { page } = router.query;

  const [currentPage, setCurrentPage] = useState<number>(
    parseInt((page as string) || '1', 10)
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
    router.push(`/page/${newPage}`);
  };

  const handleSearch = useCallback(
    (name: string, page: number) => {
      dispatch(setSearchName(name));
      setCurrentPage(page);
      router.push(`/page/${page}`);
    },
    [router, dispatch]
  );

  return (
    <main className={styles.main}>
      <article
        className={`${styles.searchList} ${selectedCards.length > 0 ? styles.searchList_selected : ''}`}
      >
        <Search nameRequest={handleSearch} />
        <ButtonError />
        {isFetching ? (
          <Spinner />
        ) : error || !data?.results.length ? (
          <h2 className={styles.searchList__errorMessage}>Nothing Found</h2>
        ) : (
          <div className={styles.content}>
            <div className={styles.content__left}>
              <CardList dataCharacters={data?.results || []} />
              <ReactPaginate
                previousClassName={`${styles.pagination__item} ${styles.pagination__previous}`}
                nextClassName={`${styles.pagination__item} ${styles.pagination__next}`}
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={`${styles.pagination__item} pagination__break-me`}
                pageCount={Math.ceil((data?.count || 0) / 10)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={styles.pagination}
                pageClassName={`${styles.pagination__item} ${styles.pagination__page}`}
                activeClassName={`${styles.pagination__item} ${styles.pagination__page_active}`}
                forcePage={currentPage - 1}
              />
            </div>
          </div>
        )}
        <Store />
      </article>
    </main>
  );
};
