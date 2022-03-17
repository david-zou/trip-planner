import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import listItemReducer from '../features/list/listItem/listItemSlice';
import listReducer from '../features/list/listSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    list: listReducer,
    // listItem: listItemReducer,
  },
});
