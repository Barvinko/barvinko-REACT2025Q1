import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
  id: string;
  name: string;
  url: string;
}

interface SelectedItemsState {
  selectedItems: Card[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Card>) => {
      state.selectedItems.push(action.payload);
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { selectItem, unselectItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
