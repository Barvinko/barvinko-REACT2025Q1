import { useState, useCallback, ChangeEvent } from 'react';
import './Search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setSearchName } from '@store/localStorageSlice';

interface SearchProps {
  nameRequest: (name: string, page: number) => void;
}

export const Search = ({ nameRequest }: SearchProps) => {
  const dispatch = useDispatch();
  const localName = useSelector(
    (state: RootState) => state.localStorage.searchName
  );
  const [inputName, setInputName] = useState<string>(localName);
  const [regexName] = useState(/^[a-zA-Z0-9\s-]*$/);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchClick = useCallback(() => {
    const trimmedName = inputName.trim();
    nameRequest(trimmedName, 1);
    dispatch(setSearchName(trimmedName));
  }, [inputName, nameRequest, dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    if (regexName.test(name)) {
      setInputName(name);
      setErrorMessage('');
    } else {
      setErrorMessage(
        'Only letters, numbers, spaces, and hyphens are allowed.'
      );
    }
  };

  return (
    <section className="search">
      <input
        className="search__input"
        type="search"
        placeholder="Name..."
        value={inputName}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button>
      {errorMessage && <p className="search__error-message">{errorMessage}</p>}
    </section>
  );
};
