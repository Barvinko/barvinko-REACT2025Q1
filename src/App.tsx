import { Routes, Route } from 'react-router-dom';
import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
