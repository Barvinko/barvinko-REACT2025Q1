import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '@/src/types/types';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [] as Country[],
    countriesTime: [] as Country[],
  },
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = [...action.payload].sort((a, b) =>
        a.name.official.localeCompare(b.name.common)
      );
      state.countriesTime = state.countries;
    },
    filterCountries: (state, action: PayloadAction<string>) => {
      state.countriesTime = state.countries.filter((country) =>
        country.name.official
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { setCountries, filterCountries } = countriesSlice.actions;

export const selectCountries = (state: {
  countries: { countries: Country[] };
}) => state.countries.countries;

export const selectCountriesTime = (state: {
  countries: { countriesTime: Country[] };
}) => state.countries.countriesTime;

export default countriesSlice.reducer;
