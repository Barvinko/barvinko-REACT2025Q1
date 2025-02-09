import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useLocalStorage } from '@utilits/useLocalStorage';
import './Search.css';

interface SearchProps {
  page: number;
  nameRequest: (name: string, page?: number) => void;
  handlePageChange: (selected: number) => void;
}

export const Search = ({
  page,
  nameRequest,
  handlePageChange,
}: SearchProps) => {
  const [localName, setLocalName] = useLocalStorage<string>(
    'Barvinko-classComponents__name',
    ''
  );
  const [inputName, setInputName] = useState<string>(localName);
  const [regexName] = useState(/^[a-zA-Z0-9\s-]*$/);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchClick = useCallback(() => {
    const trimmedName = inputName.trim();
    nameRequest(trimmedName, 1);
    setLocalName(trimmedName);
    handlePageChange(0);
  }, [inputName, nameRequest, setLocalName, handlePageChange]);

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

  const fetchData = useCallback(() => {
    nameRequest(localName, page);
  }, [localName, page, nameRequest]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
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
