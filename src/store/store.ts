import { configureStore } from '@reduxjs/toolkit';
import { starWarsApi } from './api';
import selectedCardsSlice from './selectedCardsSlice';

export const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,
    selectedCards: selectedCardsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
