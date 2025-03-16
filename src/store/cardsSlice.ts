import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string | null;
  country: string;
  isNew: boolean;
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState: [] as Card[],
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.unshift(action.payload);
    },
    markCardAsOld: (state, action: PayloadAction<number>) => {
      const card = state[action.payload];
      if (card) card.isNew = false;
    },
  },
});

export const { addCard, markCardAsOld } = cardsSlice.actions;
export default cardsSlice.reducer;
