import { Routes, Route } from 'react-router-dom';
import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { NotFound } from '@components/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
