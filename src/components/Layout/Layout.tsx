import { Outlet } from 'react-router-dom';
import './Layout.scss';

export const Layout = () => {
  return (
    <div className="container">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
