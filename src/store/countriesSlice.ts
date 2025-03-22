import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '@/src/types/types';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: [] as Country[],
  reducers: {
    setCountries: (_, action: PayloadAction<Country[]>) => {
      return [...action.payload].sort((a, b) =>
        a.name.official.localeCompare(b.name.common)
      );
    },
  },
});

export const { setCountries } = countriesSlice.actions;

export const selectCountries = (state: { countries: Country[] }) =>
  state.countries;

export default countriesSlice.reducer;
