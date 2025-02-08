import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from '@utilits/getData';
import { Character } from '@/src/types/types';
import './Details.css';

export const Details = () => {
  const { page, id } = useParams<{ page: string; id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getData<Character>(`https://swapi.dev/api/people/${id}/`)
        .then((data) => {
          setCharacter(data);
        })
        .catch((error: Error) => {
          console.error('Details retrieval error:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleClose = () => {
    navigate(`/page/${page}`);
  };

  return (
    <div className="details">
      <button onClick={handleClose}>Close</button>
      {loading ? (
        <div className="details__spinner"></div>
      ) : character ? (
        <div>
          <h2>{character.name}</h2>
          <p>Birth Year: {character.birth_year}</p>
          <p>Gender: {character.gender}</p>
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
        </div>
      ) : (
        <p>No character details available.</p>
      )}
    </div>
  );
};
