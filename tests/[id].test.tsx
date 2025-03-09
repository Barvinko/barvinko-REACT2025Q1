import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeContext } from '@store/ThemeContext';
import { store } from '@store/store';
import Id from '../pages/page/[page]/details/[id]';
import { vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { useRouter } from 'next/router';

// Мок useRouter
vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    query: { page: '1', id: '1' },
    push: vi.fn(),
  })),
}));

// Настройка mock-сервера для запросов API
const server = setupServer(
  http.get('https://example.com/api/details/:id', async ({ params }) => {
    if (params.id === '1') {
      return HttpResponse.json({
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
      });
    }
    return HttpResponse.json({ detail: 'Not found' }, { status: 404 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Id Component', () => {
  it('renders the Details component and fetches character data', async () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider
          value={{ theme: 'light', toggleTheme: () => {} }}
        >
          <Id />
        </ThemeContext.Provider>
      </Provider>
    );

    // Проверяем, что данные отображаются корректно
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
  });

  it('closes modal and navigates to page when Close button is clicked', async () => {
    const mockPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      query: { page: '1', id: '1' },
      push: mockPush,
      route: '',
      pathname: '',
      asPath: '',
      basePath: '',
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
    });

    render(
      <Provider store={store}>
        <ThemeContext.Provider
          value={{ theme: 'light', toggleTheme: () => {} }}
        >
          <Id />
        </ThemeContext.Provider>
      </Provider>
    );

    const closeButton = await screen.findByText('Close');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/page/1');
  });
});
