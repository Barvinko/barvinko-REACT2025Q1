import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string | null; // Updated to store base64 string
  country: string;
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState: [] as Card[],
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.push(action.payload);
    },
  },
});

export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer;
