import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlice';
import cardsSlice from './cardsSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    cards: cardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
