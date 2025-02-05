import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useLocalStorage } from '@utilits/useLocalStorage';
import './Search.css';

interface SearchProps {
  nameRequest: (name: string) => void;
}

export const Search = ({ nameRequest }: SearchProps) => {
  const [inputName, setInputName] = useState<string>('');
  const [localName, setLocalName] = useLocalStorage<string>(
    'Barvinko-classComponents__name',
    ''
  );
  const [regexName] = useState(/^[a-zA-Z0-9\s-]*$/);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchClick = useCallback(() => {
    const trimmedName = inputName.trim();
    nameRequest(trimmedName);
    setLocalName(trimmedName);
  }, [inputName, nameRequest, setLocalName]);

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

  useEffect(() => {
    nameRequest(localName.trim());
  }, [localName, nameRequest]);

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
