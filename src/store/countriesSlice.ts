import { createSlice } from '@reduxjs/toolkit';
import { countries } from '@/src/types/countries';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: countries,
  reducers: {},
});

export const selectCountries = (state: { countries: string[] }) =>
  state.countries;
export default countriesSlice.reducer;
