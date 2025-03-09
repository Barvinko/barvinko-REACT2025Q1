import { useState, useEffect } from 'react';
import styles from './ButtonError.module.scss';

export const ButtonError = () => {
  const [throwError, setThrowError] = useState<boolean>(false);

  useEffect(() => {
    if (throwError) {
      throw new Error('Test error');
    }
  }, [throwError]);

  return (
    <section className={styles.buttonError}>
      <button className="button" onClick={() => setThrowError(true)}>
        Throw Error
      </button>
    </section>
  );
};
