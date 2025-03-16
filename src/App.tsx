import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@components/Layout/Layout';
import { Main } from '@components/Main/Main';
import { UncontrolledForm } from '@components/UncontrolledForm/UncontrolledForm';
import { ReactForm } from '@components/ReactForm/ReactForm';
import '@styles/index.scss';
import '@styles/form.scss';

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
      {
        path: 'uncontrolled-form',
        element: <UncontrolledForm />,
      },
      {
        path: 'react-form',
        element: <ReactForm />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
