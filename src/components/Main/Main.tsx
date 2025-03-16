import { useNavigate } from 'react-router-dom';

export const Main = () => {
  const navigate = useNavigate();

  return (
    <article>
      <button onClick={() => navigate('uncontrolled-form')}>
        Uncontrolled Form
      </button>
      <button onClick={() => navigate('react-form')}>React Hook Form</button>
    </article>
  );
};
