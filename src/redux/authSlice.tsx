// src/redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../store';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectToken = (state: any) => state.auth.token;

export default authSlice.reducer;
