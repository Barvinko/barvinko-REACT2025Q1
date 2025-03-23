import { Outlet } from 'react-router-dom';
import './Layout.scss';

export const Layout = () => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="header__title">Countries Wiki</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
