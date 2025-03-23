import { useDispatch, useSelector } from 'react-redux';
import { setCountriesSort, setPopulationSort } from '@store/countriesSlice';
import { RootState } from '@store/store'; // Adjust import based on your store setup
import './SortButtons.scss';

export const SortButtons = () => {
  const dispatch = useDispatch();
  const { countriesSort, populationSort } = useSelector(
    (state: RootState) => state.countries
  );

  const toggleSortByName = () => {
    dispatch(setCountriesSort(!countriesSort));
  };

  const toggleSortByPopulation = () => {
    dispatch(setPopulationSort(!populationSort));
  };

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
