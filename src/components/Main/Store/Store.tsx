import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { unselectCard } from '@store/selectedCardsSlice';
import { saveAs } from 'file-saver';
import './Store.css';

const downloadCSV = (
  data: { name: string; url: string }[],
  filename: string
) => {
  const csvContent = [
    'The Characters of StarWars',
    ...data.map(
      (character, index) => `${index + 1}.${character.name}: ${character.url}`
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

export const Store = () => {
  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const handleUnselectAll = () => {
    selectedCards.forEach((card) => dispatch(unselectCard(card.id)));
  };

  const handleDownload = () => {
    const filename = `${selectedCards.length}_characters_of_StarWars.csv`;
    downloadCSV(selectedCards, filename);
  };

  if (selectedCards.length === 0) return <></>;

  return (
    <div className="store">
      <p>{selectedCards.length} Characters are selected</p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};
