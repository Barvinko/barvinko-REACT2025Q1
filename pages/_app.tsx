import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '@components/ThemeProvider/ThemeProvider';
import { Layout } from '@components/Layout/Layout';
import '@style/index.scss';
import '@style/class.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default MyApp;
