import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancer } from 'redux-devtools-extension';
import counterReducer from '../features/counter/counterSlice';
import geocoderReducer from '../features/geocoder/geocoderSlice';
import listReducer from '../features/list/listSlice';
import listModalReducer from '../features/listModal/listModalSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    geocoder: geocoderReducer,
    list: listReducer,
    listModal: listModalReducer,
  },
  devTools: false,
  enhancers: [devToolsEnhancer({ realtime: true })],
});
