import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { selectItem, unselectItem } from '@store/selectedItemsSlice';
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
    (state: RootState) => state.selectedItems.selectedItems
  );

  const parts = url.split('/');
  const id = parts[parts.length - 2];
  const isSelected = selectedItems.some((item) => item.id === id);

  const handleClick = () => {
    if (id && !isNaN(Number(id))) {
      navigate(`/page/${page}/details/${id}`);
    }
  };

  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(unselectItem(id));
    } else {
      dispatch(selectItem({ id, name, url }));
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
