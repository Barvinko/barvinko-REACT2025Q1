import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';
import { Details } from '@components/Main/Details/Details';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { NotFound } from '@components/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" replace />} />
        <Route path="page/:page" element={<Main />}>
          <Route path="details/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
