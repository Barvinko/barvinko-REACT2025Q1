import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Page Not Found</p>
      <Link className="not-found__link" to="/">
        Go to Home
      </Link>
    </div>
  );
};
