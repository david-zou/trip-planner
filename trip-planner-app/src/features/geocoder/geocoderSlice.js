import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queryName: '',
  // locations list
  queryLatLng: {
      lat: 0,
      lng: 0,
  },
  // currently selected item in list, does not always coincide with index above
};

export const geocoderSlice = createSlice({
  name: 'geocoder',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateQueryName: (state, action) => {
      state.queryName = action.payload;
    },
    updateQueryLatLng: (state, action) => {
      state.queryLatLng = action.payload;
    },
  }
});

export const { updateQueryName, updateQueryLatLng } = geocoderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
// export const selectName = (state) => state.listItem.name;
export const selectQueryName = (state) => state.geocoder.queryName;
export const selectQueryLatLng = (state) => state.geocoder.queryLatLng;

export default geocoderSlice.reducer;
