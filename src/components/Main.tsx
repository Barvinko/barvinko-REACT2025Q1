// import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// import './Main.scss';

export const Main = () => {
  const navigate = useNavigate();
  // const { page } = useParams<{ page: string }>();

  return (
    <article>
      <button onClick={() => navigate('form')}>Form</button>
      <button onClick={() => navigate('react-form')}>ReactForm</button>
    </article>
  );
};
