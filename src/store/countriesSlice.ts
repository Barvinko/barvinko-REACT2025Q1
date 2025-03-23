import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '@/src/types/countryTypesAPI';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [] as Country[],
    countriesTime: [] as Country[],
    countryName: '' as string,
    selectedRegion: 'All' as string,
  },
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = [...action.payload].sort((a, b) =>
        a.name.official.localeCompare(b.name.common)
      );
      state.countriesTime = filterCountriesByRules(state);
    },
    setRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
      state.countriesTime = filterCountriesByRules(state);
    },
    setName: (state, action: PayloadAction<string>) => {
      state.countryName = action.payload.toLowerCase();
      state.countriesTime = filterCountriesByRules(state);
    },
  },
});

function filterCountriesByRules(state: {
  countries: Country[];
  countryName: string;
  selectedRegion: string;
}) {
  return state.countries.filter((country) => {
    const matchesName = country.name.official
      .toLowerCase()
      .includes(state.countryName);
    const matchesRegion =
      state.selectedRegion === 'All' || country.region === state.selectedRegion;
    return matchesName && matchesRegion;
  });
}

export const { setCountries, setRegion, setName } = countriesSlice.actions;

export const selectCountries = (state: {
  countries: { countries: Country[] };
}) => state.countries.countries;

export const selectCountriesTime = (state: {
  countries: { countriesTime: Country[] };
}) => state.countries.countriesTime;

export default countriesSlice.reducer;
