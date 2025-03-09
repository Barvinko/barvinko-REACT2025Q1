export type ResponseStarWars = {
  count: number;
  next: null;
  previous: null;
  results: Character[];
};

export interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  url: string;
}
