import { CountryCard } from './CountryCard/CountryCard';
import './CountryList.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

export const CountryList = () => {
  const countries = useSelector((state: RootState) => state.countries);

  return (
    <div className="country-list">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};
