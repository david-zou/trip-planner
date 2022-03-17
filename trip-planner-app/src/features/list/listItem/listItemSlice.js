import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // location name
  name: 'Chicago',
  // latitude and longitude
  latLng: { lat: function() {
      return 41.85;
    },
    lng: function() {
      return -87.65;
    },
  },
  description: "Chicago, Capital City of Illinois",
  timeRange: "0:00 - 23:59",
};

export const listItemSlice = createSlice({
  name: 'listItem',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    editPlace: (state, action) => {
      state.name = action.name;
      state.latLng = action.latLng;
      state.description = action.description;
      state.timeRange = action.timeRange;
    },
  }
});

export const { editPlace } = listItemSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
export const selectName = (state) => state.listItem.name;
export const selectLatLng = (state) => state.listItem.latLng;
export const selectDescription = (state) => state.listItem.description;
export const selectTimeRange = (state) => state.listItem.timeRange;

export default listItemSlice.reducer;
