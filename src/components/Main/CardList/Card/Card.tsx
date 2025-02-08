import { useParams, useNavigate } from 'react-router-dom';
import './Card.css';

interface CardProps {
  name: string;
  url: string;
}

export const Card = ({ name, url }: CardProps) => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();

  const handleClick = () => {
    const parts = url.split('/');
    navigate(`/page/${page}/details/${parts[parts.length - 2]}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <h3>{name}</h3>
    </div>
  );
};
