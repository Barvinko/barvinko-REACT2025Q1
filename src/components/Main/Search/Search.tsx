import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from '@store/countriesSlice';
import './Search.scss';

export const Search = () => {
  const [inputCountry, setInputCountry] = useState<string>('');
  const dispatch = useDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setInputCountry(name);
    dispatch(setName(name));
  };

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
