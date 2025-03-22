import { useGetCountriesQuery } from '@store/api';
import { useEffect } from 'react';
import { CountryCard } from './CountryCard/CountryCard';
import './Main.scss';

export const Main = () => {

  const { data } = useGetCountriesQuery({});
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
  <article>
    {data &&
      data.map((country) => 
        <CountryCard key={country.cca3} country={country} />
      )}
  </article>
);

};
