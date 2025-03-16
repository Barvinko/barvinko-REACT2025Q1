import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useEffect } from 'react';

export const Main = () => {
  const navigate = useNavigate();
  const cards = useSelector((state: RootState) => state.cards);

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  return (
    <article>
      <button onClick={() => navigate('uncontrolled-form')}>
        Uncontrolled Form
      </button>
      <button onClick={() => navigate('react-form')}>React Hook Form</button>
      <section>
        {cards.map((card, index) => (
          <div key={index} className="card">
            <p>Name: {card.name}</p>
            <p>Age: {card.age}</p>
            <p>Email: {card.email}</p>
            <p>password: {card.password}</p>
            <p>Confirm Password: {card.confirmPassword}</p>
            <p>Gender: {card.gender}</p>
            <p>Terms: {`${card.terms}`}</p>
            <p>Country: {card.country}</p>
          </div>
        ))}
      </section>
    </article>
  );
};
