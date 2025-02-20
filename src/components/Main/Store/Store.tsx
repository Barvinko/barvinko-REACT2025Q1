import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { unselectCard } from '@store/selectedCardsSlice';
import './Store.css';

export const Store = () => {
  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const handleUnselectAll = () => {
    selectedCards.forEach((card) => dispatch(unselectCard(card.id)));
  };

  if (selectedCards.length === 0) return null;

  return (
    <div className="store">
      <p>{selectedCards.length} Characters are selected</p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button>Download</button>
    </div>
  );
};
