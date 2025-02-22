import { Component, ReactNode, ErrorInfo } from 'react';
import './ErrorBoundary.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <article className="error-boundary">
          <h1>Oops!</h1>
          <h3>Something went wrong.</h3>
          <h3>Please try again.</h3>
          <button onClick={() => window.location.reload()}>Reload</button>
        </article>
      );
    }

    return this.props.children;
  }
}
