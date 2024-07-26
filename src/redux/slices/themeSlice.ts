import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  darkMode: boolean;
}

const getSystemDefaultTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: ThemeState = {
  darkMode: getSystemDefaultTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
