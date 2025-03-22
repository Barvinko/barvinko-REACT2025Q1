import { CountryCard } from './CountryCard/CountryCard';
import './CountryList.scss';
import { useSelector } from 'react-redux';
import { selectCountriesTime } from '@store/countriesSlice';

export const CountryList = () => {
  const countries = useSelector(selectCountriesTime);

  return countries.length ? (
    <section className="country-list">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </section>
  ) : (
    <h2 className="country-list__empty">No countries found</h2>
  );
};
