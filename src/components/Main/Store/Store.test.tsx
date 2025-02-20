import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedCardsReducer from '@store/selectedCardsSlice';
import { Store } from './Store';

const renderWithRedux = (
  component: JSX.Element,
  {
    initialState,
    store = configureStore({
      reducer: { selectedCards: selectedCardsReducer },
      preloadedState: initialState,
    }),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

test('renders Store component with selected items', () => {
  const initialState = {
    selectedCards: {
      selectedCards: [
        {
          id: '1',
          name: 'Luke Skywalker',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    },
  };

  renderWithRedux(<Store />, { initialState });

  expect(screen.getByText('1 Characters are selected')).toBeInTheDocument();
  expect(screen.getByText('Unselect all')).toBeInTheDocument();
  expect(screen.getByText('Download')).toBeInTheDocument();
});

test('does not render Store component when no items are selected', () => {
  const initialState = {
    selectedCards: {
      selectedCards: [],
    },
  };

  renderWithRedux(<Store />, { initialState });

  expect(screen.queryByText('Characters are selected')).not.toBeInTheDocument();
});

test('unselects all items when "Unselect all" button is clicked', () => {
  const initialState = {
    selectedCards: {
      selectedCards: [
        {
          id: '1',
          name: 'Luke Skywalker',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    },
  };

  const { store } = renderWithRedux(<Store />, { initialState });

  fireEvent.click(screen.getByText('Unselect all'));

  expect(store.getState().selectedCards.selectedCards).toHaveLength(0);
});

test('calls download function when "Download" button is clicked', () => {
  const initialState = {
    selectedCards: {
      selectedCards: [
        {
          id: '1',
          name: 'Luke Skywalker',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    },
  };

  renderWithRedux(<Store />, { initialState });

  const downloadButton = screen.getByText('Download');
  fireEvent.click(downloadButton);
});
