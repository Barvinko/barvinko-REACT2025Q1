import { useContext } from 'react';
import { ThemeContext } from '@store/ThemeContext';
import './Header.scss';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <button className="button" onClick={toggleTheme}>
        {theme === 'light' ? '☀️' : '🌙'}
      </button>
      <h1 className="header__title">The Characters of StarWars</h1>
    </header>
  );
};
