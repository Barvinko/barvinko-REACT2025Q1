import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '@/src/types/countryTypesAPI';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [] as Country[],
    countriesTime: [] as Country[],
    countryName: '' as string,
    selectedRegion: 'All' as string,
    countriesSort: true as boolean | null,
    populationSort: true as boolean | null,
  },
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = [...action.payload];
      state.countriesTime = applyFiltersAndSorting(state);
    },
    setRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
      state.countriesTime = applyFiltersAndSorting(state);
    },
    setName: (state, action: PayloadAction<string>) => {
      state.countryName = action.payload.toLowerCase();
      state.countriesTime = applyFiltersAndSorting(state);
    },
    setCountriesSort: (state, action: PayloadAction<boolean>) => {
      state.countriesSort = action.payload;
      state.populationSort = null;
      state.countriesTime = applyFiltersAndSorting(state);
    },
    setPopulationSort: (state, action: PayloadAction<boolean>) => {
      state.populationSort = action.payload;
      state.countriesSort = null;
      state.countriesTime = applyFiltersAndSorting(state);
    },
  },
});

function applyFiltersAndSorting(state: {
  countries: Country[];
  countryName: string;
  selectedRegion: string;
  countriesSort: boolean | null;
  populationSort: boolean | null;
}) {
  let filteredCountries = state.countries.filter((country) => {
    const matchesName = country.name.official
      .toLowerCase()
      .includes(state.countryName);
    const matchesRegion =
      state.selectedRegion === 'All' || country.region === state.selectedRegion;
    return matchesName && matchesRegion;
  });

  if (state.countriesSort !== null) {
    filteredCountries = filteredCountries.sort((a, b) =>
      state.countriesSort
        ? a.name.official.localeCompare(b.name.official)
        : b.name.official.localeCompare(a.name.official)
    );
  } else if (state.populationSort !== null) {
    filteredCountries = filteredCountries.sort((a, b) =>
      state.populationSort
        ? a.population - b.population
        : b.population - a.population
    );
  }

  return filteredCountries;
}

export const {
  setCountries,
  setRegion,
  setName,
  setCountriesSort,
  setPopulationSort,
} = countriesSlice.actions;

export const selectCountries = (state: {
  countries: { countries: Country[] };
}) => state.countries.countries;

export const selectCountriesTime = (state: {
  countries: { countriesTime: Country[] };
}) => state.countries.countriesTime;

export default countriesSlice.reducer;
