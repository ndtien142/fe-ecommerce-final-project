import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IRules } from './interface';

type StateProps = {
  username: string;
  showPassword: boolean;
  isExpired: boolean;
  policy: string;
  rules: IRules[];
};
const initialState: StateProps = {
  showPassword: false,
  username: '',
  isExpired: false,
  policy: '',
  rules: [],
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setIsExpired: (state, action) => {
      state.isExpired = action.payload;
    },
    setPolicies: (state, action) => {
      state.policy = action.payload;
    },
    setRules: (state, action) => {
      state.rules = action.payload;
    },
  },
});

export const { setShowPassword, setUsername, setIsExpired, setPolicies, setRules } =
  loginSlice.actions;

export const showPasswordSelector = (state: RootState) => state.login.showPassword;
export const emailSelector = (state: RootState) => state.login.username;
export const isExpiredSelector = (state: RootState) => state.login.isExpired;
export const policySelector = (state: RootState) => state.login.policy;
export const rulesSelector = (state: RootState) => state.login.rules;

export default loginSlice.reducer;
