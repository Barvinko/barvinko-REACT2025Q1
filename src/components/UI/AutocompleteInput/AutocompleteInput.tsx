import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCountries } from '@store/countriesSlice';
import { NameInput, FormInputProps } from '@/src/types/types';
import './AutocompleteInput.scss';

export const AutocompleteInput: React.FC<
  FormInputProps & { onChange?: (value: string) => void }
> = ({ nameData, error, register, onChange }) => {
  const countries = useSelector(selectCountries);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { onChange: formOnChange, ...restRegister } = register
    ? register(nameData as NameInput)
    : { onChange: undefined };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInputValue(query);
    if (formOnChange) formOnChange(event);
    if (onChange) onChange(query);
    if (query) {
      setFilteredCountries(
        countries.filter((country) =>
          country.toLowerCase().includes(query.toLowerCase())
        )
      );
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (country: string) => {
    setInputValue(country);
    if (formOnChange) {
      formOnChange({ target: { name: nameData, value: country } });
    }
    if (onChange) {
      onChange(country);
    }
    setShowDropdown(false);
  };

  return (
    <div className="form__input-container">
      <label htmlFor={nameData} className="form__label">
        Country
      </label>
      <input
        name={nameData}
        {...restRegister}
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        className="form__input"
        autoComplete="off"
      />
      {showDropdown && (
        <ul className="autocomplete__dropdown">
          {filteredCountries.map((country) => (
            <li
              key={country}
              onClick={() => handleSelect(country)}
              className="autocomplete__item"
            >
              {country}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="form__error">{error}</p>}
    </div>
  );
};
