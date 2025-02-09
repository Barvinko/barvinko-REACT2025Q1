import { useState, useEffect } from 'react';
import './ButtonError.css';

export const ButtonError = () => {
  const [throwError, setThrowError] = useState<boolean>(false);

  useEffect(() => {
    if (throwError) {
      throw new Error('Test error');
    }
  }, [throwError]);

  return (
    <section className="search-list__test-error">
      <button
        className="search-list__button-error"
        onClick={() => setThrowError(true)}
      >
        Throw Error
      </button>
    </section>
  );
};
