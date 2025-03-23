import { Country } from '@/src/types/countryTypesAPI';
import './CountryCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisitedCountry } from '@store/countriesSlice';
import { RootState } from '@store/store';

interface CountryCardProps {
  country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
  const dispatch = useDispatch();
  const visitedCountries = useSelector(
    (state: RootState) => state.countries.visitedCountries
  );

  const isVisited = visitedCountries.includes(country.cca3);

  const handleCardClick = () => {
    dispatch(toggleVisitedCountry(country.cca3));
  };

  return (
    <div
      className={`country-card ${isVisited ? 'country-card_visited' : ''}`}
      onClick={handleCardClick}
    >
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
