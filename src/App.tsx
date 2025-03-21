import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@components/Layout/Layout';
import { Main } from '@components/Main/Main';

import '@styles/index.scss';
import '@styles/class.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: '*',
        element: <Main />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
