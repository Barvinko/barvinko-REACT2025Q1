import { useGetCountriesQuery } from '@store/api';
import { useEffect } from 'react';
import { CountryList } from './CountryList/CountryList';
import './Main.scss';
import { useDispatch } from 'react-redux';
import { setCountries } from '@store/countriesSlice';

export const Main = () => {
  const { data } = useGetCountriesQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCountries(data));
    }
  }, [data, dispatch]);

  return <article>{data && <CountryList />}</article>;
};
