import { useState, useEffect } from 'react';
import './ButtonError.scss';

export const ButtonError = () => {
  const [throwError, setThrowError] = useState<boolean>(false);

  useEffect(() => {
    if (throwError) {
      throw new Error('Test error');
    }
  }, [throwError]);

  return (
    <section className="button-error">
      <button className="button" onClick={() => setThrowError(true)}>
        Throw Error
      </button>
    </section>
  );
};
