import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CountryList } from './CountryList/CountryList';
import { Search } from './Search/Search';
import { useGetCountriesQuery } from '@store/api';
import { setCountries } from '@store/countriesSlice';
import './Main.scss';

export const Main = () => {
  const { data } = useGetCountriesQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCountries(data));
    }
  }, [data, dispatch]);

  return (
    <article>
      <Search />
      {data && <CountryList />}
    </article>
  );
};
