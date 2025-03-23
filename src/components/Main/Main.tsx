import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountryList } from './CountryList/CountryList';
import { Search } from './Search/Search';
import { SelectRegion } from './SelectRegion/SelectRegion';
import { SortButtons } from './SortButtons/SortButtons';
import { useGetCountriesQuery } from '@store/api';
import { setCountries, selectCountriesTime } from '@store/countriesSlice';
import './Main.scss';

export const Main = () => {
  const { data } = useGetCountriesQuery({});
  const dispatch = useDispatch();
  const filteredCountries = useSelector(selectCountriesTime);

  useEffect(() => {
    if (data) {
      dispatch(setCountries(data));
    }
  }, [data, dispatch]);

  return (
    <article>
      <section className="navigation">
        <Search />
        <div className="navigation__filters">
          <SelectRegion />
          <SortButtons />
        </div>
      </section>
      {filteredCountries && <CountryList />}
    </article>
  );
};
