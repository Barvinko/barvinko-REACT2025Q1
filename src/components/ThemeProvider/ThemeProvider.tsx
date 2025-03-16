import { useState, ReactNode } from 'react';
import { ThemeContext } from '@store/ThemeContext';
import './ThemeProvider.scss';

interface ThemeProvider {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProvider) => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`body ${theme}`}>
        <div className={'container'}>{children}</div>
      </div>
    </ThemeContext.Provider>
  );
};
