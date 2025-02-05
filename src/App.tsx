import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import './App.css';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <Main />
      </ErrorBoundary>
    </>
  );
}

export default App;
