import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Spinner } from '@components/UI/Spinner/Spinner';
import { useGetDetailsQuery } from '@store/api';
import './Details.css';

export const Details = () => {
  const { page, id } = useParams<{ page: string; id: string }>();
  const navigate = useNavigate();
  const [modalFlag, setModalFlag] = useState(false);

  const { data, error, isFetching } = useGetDetailsQuery({
    id: id ? id : '',
  });

  useEffect(() => {
    if (id) {
      setModalFlag(true);
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
        {isFetching ? (
          <div className="details__spinner">
            <Spinner />
          </div>
        ) : error || !data ? (
          <p>No character details available.</p>
        ) : (
          <div>
            <h2>{data.name}</h2>
            <p>Birth Year: {data.birth_year}</p>
            <p>Gender: {data.gender}</p>
            <p>Height: {data.height}</p>
            <p>Mass: {data.mass}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};
