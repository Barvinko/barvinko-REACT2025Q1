import { Country } from '@/src/types/types';
import './CountryCard.scss';

interface CountryCardProps {
  country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <div className="country-card">
      <img
        className="country-card__flag"
        src={country.flags?.png}
        alt={country.name?.common}
      />
      <h2>{country.name?.official}</h2>
      <p className="country-card__info">
        <span className="country-card__info-cell">
          <b>Population:</b> {country.population?.toLocaleString()}
        </span>
        <span className="country-card__info-cell">
          <b>Region:</b> {country.region}
        </span>
      </p>
    </div>
  );
};
