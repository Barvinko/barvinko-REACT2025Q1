import { http } from 'msw';

export const handlers = [
  http.get('https://swapi.dev/api/people/', (req, res, ctx) => {
    return res(ctx.json({ results: [{ name: 'Luke Skywalker' }], count: 1 }));
  }),
];
