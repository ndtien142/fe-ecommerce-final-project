import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from 'src/common/@types/product/category.interface';
import { RootState } from 'src/common/redux/store';

interface ItemsState {
  items: ICategory[];
}

const initialState: ItemsState = {
  items: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setItemsCategory: (state, action: PayloadAction<ICategory[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setItemsCategory } = categoriesSlice.actions;

export const selectItemsCategory = (state: RootState) => state.categories.items;

export default categoriesSlice.reducer;
