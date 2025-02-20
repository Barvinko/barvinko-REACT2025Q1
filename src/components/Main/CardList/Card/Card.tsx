import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { selectCard, unselectCard } from '@store/selectedCardsSlice';
import './Card.css';

interface CardProps {
  name: string;
  url: string;
}

export const Card = ({ name, url }: CardProps) => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const parts = url.split('/');
  const id = parts[parts.length - 2];
  const isSelected = selectedItems.some((card) => card.id === id);

  const handleClick = () => {
    if (id && !isNaN(Number(id))) {
      navigate(`/page/${page}/details/${id}`);
    }
  };

  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(unselectCard(id));
    } else {
      dispatch(selectCard({ id, name, url }));
    }
  };

  return (
    <div className="card">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <h3 onClick={handleClick}>{name}</h3>
    </div>
  );
};
