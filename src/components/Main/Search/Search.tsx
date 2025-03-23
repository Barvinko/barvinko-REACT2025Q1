import { useState, ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from '@store/countriesSlice';
import './Search.scss';

export const Search = () => {
  const [inputCountry, setInputCountry] = useState<string>('');
  const dispatch = useDispatch();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value;
      setInputCountry(name);
      dispatch(setName(name));
    },
    [dispatch]
  );

  return (
    <section className="search">
      <input
        className="search__input"
        type="search"
        placeholder="Country..."
        value={inputCountry}
        onChange={handleInputChange}
      />
    </section>
  );
};
