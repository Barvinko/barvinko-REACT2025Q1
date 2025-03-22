import { useGetCountriesQuery } from '@store/api';
import { useEffect } from 'react';
import { CountryList } from './CountryList/CountryList';
import './Main.scss';

export const Main = () => {
  const { data } = useGetCountriesQuery({});
  useEffect(() => {
    console.log(data);
  }, [data]);

  return <article>{data && <CountryList countrys={data} />}</article>;
};
