import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button className="button-back" onClick={() => navigate('/')}>
      Back
    </button>
  );
};
