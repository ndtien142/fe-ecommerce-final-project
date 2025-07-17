import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

interface LastVisitedState {
  productUrl: string | null;
}

const initialState: LastVisitedState = {
  productUrl: null,
};

export const lastVisitedSlice = createSlice({
  name: 'lastVisited',
  initialState,
  reducers: {
    setLastVisitedProduct: (state, action: PayloadAction<string>) => {
      state.productUrl = action.payload;
    },
    clearLastVisitedProduct: (state) => {
      state.productUrl = null;
    },
  },
});

export const { setLastVisitedProduct, clearLastVisitedProduct } = lastVisitedSlice.actions;

export const selectLastVisitedProduct = (state: RootState) => state.lastVisited.productUrl;

export default lastVisitedSlice.reducer;
