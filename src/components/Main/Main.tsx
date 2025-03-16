import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/store';
import { useEffect, useState } from 'react';
import './Main.scss';
import { markCardAsOld } from '@store/cardsSlice';

export const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards);
  const [newCardIndexes, setNewCardIndexes] = useState<number[]>([]);

  useEffect(() => {
    const newIndexes = cards
      .map((card, index) => (card.isNew ? index : -1))
      .filter((index) => index !== -1);

    setNewCardIndexes(newIndexes);

    const timers = newIndexes.map((index) =>
      setTimeout(() => {
        dispatch(markCardAsOld(index));
        setNewCardIndexes((prev) => prev.filter((i) => i !== index));
      }, 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [cards, dispatch]);

  return (
    <article>
      <button onClick={() => navigate('uncontrolled-form')}>
        Uncontrolled Form
      </button>
      <button onClick={() => navigate('react-form')}>React Hook Form</button>
      <section className="cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${newCardIndexes.includes(index) ? 'card_new' : ''}`}
          >
            <p>Name: {card.name}</p>
            <p>Age: {card.age}</p>
            <p>Email: {card.email}</p>
            <p>Password: {card.password}</p>
            <p>Confirm Password: {card.confirmPassword}</p>
            <p>Gender: {card.gender}</p>
            <p>Terms: {`${card.terms}`}</p>
            <p>Country: {card.country}</p>
            {card.picture && (
              <img
                className="card__picture"
                src={card.picture}
                alt={`${card.name}'s picture`}
              />
            )}
          </div>
        ))}
      </section>
    </article>
  );
};
