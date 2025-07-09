import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRegisterState {
  email: string;
  username: string;
}

const initialState: IRegisterState = {
  email: '',
  username: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setUsernameRegister(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    resetRegisterState(state) {
      state.email = '';
      state.username = '';
    },
  },
});

export const { setEmail, setUsernameRegister, resetRegisterState } = registerSlice.actions;

export default registerSlice.reducer;
