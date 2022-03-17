import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  index: 0,
  list: [
    {
      // UID
      uid: '1234567890',
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
    },
    {
      // UID
      uid: '2345678901',
      // location name
      name: 'San Francisco',
      // latitude and longitude
      latLng: { lat: function() {
          return 37.7749;
        },
        lng: function() {
          return 122.4194;
        },
      },
      description: "San Francisco, Home of the Golden Gate Bridge",
      timeRange: "6:00 - 18:00",
    },
  ]
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addOne: (state, action) => {
      // where payload is an object containing name, latlng, description, timerange metadata of a listitem
      state.list.push(action.payload.list[action.payload.index])
    },
    updateOne: (state, action) => {
      state.list.splice(action.payload.index, 1, action.payload.list[action.payload.index]);
    },
    deleteOne: (state, action) => {
      state.list.splice(action.payload.index, 1);
    },
  }
});

export const { addOne, updateOne, deleteOne } = listSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
// export const selectName = (state) => state.listItem.name;
export const selectList = (state) => state.list.list;
export const selectIndex = (state) => state.list.index;

export default listSlice.reducer;
