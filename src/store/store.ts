import { configureStore } from '@reduxjs/toolkit';
import { starWarsApi } from './api';
import selectedCardsSlice from './selectedCardsSlice';
import localStorageReducer from './localStorageSlice';

export const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,
    selectedCards: selectedCardsSlice,
    localStorage: localStorageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
