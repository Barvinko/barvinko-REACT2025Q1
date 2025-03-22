import { Country } from '@/src/types/types';
import { CountryCard } from './CountryCard/CountryCard';
import './CountryList.scss';

interface CountryListProps {
  countrys: Country[];
}

export const CountryList = ({ countrys }: CountryListProps) => {
  return (
    <div className="country-list">
      {countrys.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};
