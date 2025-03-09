import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import HomePage from '../pages/index';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('HomePage', () => {
  it('should redirect to /page/1', () => {
    const mockRouter = {
      replace: vi.fn(),
    };
    (useRouter as Mock).mockReturnValue(mockRouter);

    render(<HomePage />);

    expect(mockRouter.replace).toHaveBeenCalledWith('/page/1');
  });

  it('should render the home page div', () => {
    render(<HomePage />);
    const homePageDiv = screen.getByTestId('home-page');
    expect(homePageDiv).toBeInTheDocument();
  });
});
