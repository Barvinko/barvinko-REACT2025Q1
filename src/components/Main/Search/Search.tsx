import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { createLocalValue } from '../../../utilits/useLocalStorage';
import './Search.css';

interface SearchProps {
  nameRequest: (name: string) => void;
}

export const Search = ({ nameRequest }: SearchProps) => {
  const _savedName = createLocalValue<string>('Barvinko-classComponents__name');
  const _regexName = /^[a-zA-Z0-9\s-]*$/;

  const [name, setName] = useState<string>(_savedName.get());
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchClick = useCallback(() => {
    const trimmedName = name.trim();
    nameRequest(trimmedName);
    _savedName.set(trimmedName);
  }, [name, nameRequest, _savedName]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    if (_regexName.test(name)) {
      setName(name);
      setErrorMessage('');
    } else {
      setErrorMessage(
        'Only letters, numbers, spaces, and hyphens are allowed.'
      );
    }
  };

  useEffect(() => {
    handleSearchClick();
  }, [handleSearchClick]);

  return (
    <section className="search">
      <input
        className="search__input"
        type="search"
        placeholder="Name..."
        value={name}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button>
      {errorMessage && <p className="search__error-message">{errorMessage}</p>}
    </section>
  );
};
