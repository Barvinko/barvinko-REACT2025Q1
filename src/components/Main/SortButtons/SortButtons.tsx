import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { setCountriesSort, setPopulationSort } from '@store/countriesSlice';
import { RootState } from '@store/store';
import './SortButtons.scss';

export const SortButtons = () => {
  const dispatch = useDispatch();
  const { countriesSort, populationSort } = useSelector(
    (state: RootState) => state.countries
  );

  const toggleSortByName = useCallback(() => {
    dispatch(setCountriesSort(!countriesSort));
  }, [dispatch, countriesSort]);

  const toggleSortByPopulation = useCallback(() => {
    dispatch(setPopulationSort(!populationSort));
  }, [dispatch, populationSort]);

  return (
    <div className="sort-buttons">
      <button onClick={toggleSortByName}>
        Countries ({countriesSort ? 'A-Z' : 'Z-A'})
      </button>
      <button onClick={toggleSortByPopulation}>
        Population ({populationSort ? '↑' : '↓'})
      </button>
    </div>
  );
};
