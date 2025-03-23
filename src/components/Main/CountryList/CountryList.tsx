import React, { useMemo } from 'react';
import { CountryCard } from './CountryCard/CountryCard';
import './CountryList.scss';
import { useSelector } from 'react-redux';
import { selectCountriesTime } from '@store/countriesSlice';

export const CountryList = React.memo(() => {
  const countries = useSelector(selectCountriesTime);

  const memoizedCountries = useMemo(() => countries, [countries]);

  return memoizedCountries.length ? (
    <section className="country-list">
      {memoizedCountries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </section>
  ) : (
    <h2 className="country-list__empty">No countries found</h2>
  );
});

CountryList.displayName = 'CountryList';
