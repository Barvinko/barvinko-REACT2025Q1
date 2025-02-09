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
    const id = parts[parts.length - 2];
    if (id && !isNaN(Number(id))) {
      navigate(`/page/${page}/details/${id}`);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <h3>{name}</h3>
    </div>
  );
};
