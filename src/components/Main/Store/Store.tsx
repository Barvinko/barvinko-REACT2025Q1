import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import './Store.css';

export const Store = () => {
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  if (selectedCards.length === 0) return null;

  return (
    <div className="store">
      <p>{selectedCards.length} Characters are selected</p>
      <button>Unselect all</button>
      <button>Download</button>
    </div>
  );
};
