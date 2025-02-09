import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from '@utilits/getData';
import Modal from 'react-modal';
import { Character } from '@/src/types/types';
import './Details.css';

export const Details = () => {
  const { page, id } = useParams<{ page: string; id: string }>();
  const navigate = useNavigate();
  const [modalFlag, setModalFlag] = useState(false);
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setModalFlag(true);
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
    setModalFlag(false);
  };

  return (
    <div
      className={`content__right ${modalFlag ? 'content__right_active' : ''}`}
    >
      <Modal
        overlayClassName="details"
        className="details__content"
        isOpen={modalFlag}
        onRequestClose={handleClose}
        ariaHideApp={false}
      >
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
      </Modal>
    </div>
  );
};
