// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import the root reducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;
