import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

test('renders Spinner component', () => {
  const { container } = render(<Spinner />);
  expect(container.querySelector('.spinner')).toBeInTheDocument();
});
