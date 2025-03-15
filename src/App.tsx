import { Routes, Route } from 'react-router-dom';
import { Main } from '@components/Main';
import { Form } from '@components/Form/Form';
import { ReactForm } from '@components/ReactForm/ReactForm';
import './styles/index.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="form" element={<Form />} />
      <Route path="react-form" element={<ReactForm />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;
