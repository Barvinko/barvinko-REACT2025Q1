import { Character } from '../../../../types/types';

export const Card = ({
  name,
  birth_year,
  gender,
  height,
  mass,
  url,
}: Character) => {
  return (
    <div className="card">
      <div className="card__title">
        <h3>{name}</h3>
      </div>
      <div className="card__info">
        <p>Birth Year: {birth_year}</p>
        <p>Gender: {gender}</p>
        <p>Height: {height}</p>
        <p>Mass: {mass}</p>
        <p>
          <a href={url}>Link</a>
        </p>
      </div>
    </div>
  );
};
