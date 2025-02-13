import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseStarWars } from '@/src/types/types';

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      ResponseStarWars,
      { name: string; page: number }
    >({
      query: ({ name, page }) => `?search=${name}&page=${page}`,
    }),
  }),
});

export const { useGetCharactersQuery } = starWarsApi;
