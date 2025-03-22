import { Country } from '@/src/types/types';
import './CountryCard.scss';

interface CountryCardProps {
  country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <div className="country-card">
      <img src={country.flags?.png} alt={country.name?.common} />
      <h2>{country.name?.official}</h2>
      <p>{country.population?.toLocaleString()}</p>
      <p>{country.region}</p>
    </div>
  );
};