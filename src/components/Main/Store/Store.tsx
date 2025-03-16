import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { unselectCard } from '@store/selectedCardsSlice';
import './Store.scss';

export const Store = () => {
  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const handleUnselectAll = () => {
    selectedCards.forEach((card) => dispatch(unselectCard(card.id)));
  };

  const handleDownload = (): string => {
    const csvContent = [
      'The Characters of StarWars',
      ...selectedCards.map(
        (character, index) => `${index + 1}.${character.name}: ${character.url}`
      ),
    ].join('\n');

    const blow = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blow);
  };

  if (selectedCards.length === 0) return <></>;

  return (
    <div className="store">
      <p className="store__count">
        {selectedCards.length} Characters are selected
      </p>
      <button className="button store__button" onClick={handleUnselectAll}>
        Unselect all
      </button>
      <a
        href={handleDownload()}
        download={`${selectedCards.length}_characters_of_StarWars.csv`}
        className="button store__button"
      >
        Download
      </a>
    </div>
  );
};
