import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Country } from '@/src/types/countryTypesAPI';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/' }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], object>({
      query: () => `all`,
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
