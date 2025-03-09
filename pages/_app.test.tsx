import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import MyApp from './_app';
import { useRouter } from 'next/router';
import React from 'react';
import { NextRouter } from 'next/router';
import { createContext } from 'react';

const createMockRouter = (overrides: Partial<NextRouter>): NextRouter => ({
  route: '',
  pathname: '',
  query: {},
  asPath: '',
  basePath: '',
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn().mockResolvedValue(undefined),
  beforePopState: vi.fn(),
  isFallback: false,
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isReady: true,
  isPreview: false,
  isLocaleDomain: false,
  ...overrides,
});

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockRouter = createMockRouter({ pathname: '/' });
const RouterContext = createContext<NextRouter>(mockRouter);

vi.mock('@components/ErrorBoundary/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe('MyApp Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue(mockRouter);
  });

  it('renders the component with Layout for non-404 pages', () => {
    const TestComponent = () => <div>Test Component</div>;

    const { getByText } = render(
      <RouterContext.Provider value={mockRouter}>
        <MyApp Component={TestComponent} pageProps={{}} router={mockRouter} />
      </RouterContext.Provider>
    );

    expect(getByText('Test Component')).toBeInTheDocument();
  });

  it('renders the component without Layout for 404 pages', () => {
    const mockRouter404 = createMockRouter({ pathname: '/404' });
    (useRouter as Mock).mockReturnValue(mockRouter404);

    const TestComponent = () => <div>404</div>;

    const { getByText } = render(
      <RouterContext.Provider value={mockRouter404}>
        <MyApp
          Component={TestComponent}
          pageProps={{}}
          router={mockRouter404}
        />
      </RouterContext.Provider>
    );

    expect(getByText('404')).toBeInTheDocument();
  });
});
