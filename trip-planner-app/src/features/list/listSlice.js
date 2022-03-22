import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  index: null,
  list: [
    {
      // UID
      uid: '1234567890',
      // location name
      name: 'Chicago',
      // latitude and longitude
      latLng: { lat: 41.85,
                lng: -87.65 },
      description: "Chicago, Capital City of Illinois",
      timeRange: "0:00 - 23:59",
    },
    {
      // UID
      uid: '2345678901',
      // location name
      name: 'San Francisco',
      // latitude and longitude
      latLng: { lat: 37.7749,
                lng: 122.4194 },
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
      // state.list.push(action.payload.list[action.payload.index])
      state.list.push(action.payload.metadata)
    },
    updateOne: (state, action) => {
      state.list.splice(action.payload.index, 1, action.payload.metadata);
    },
    deleteOne: (state, action) => {
      state.list.splice(action.payload.index, 1);
    },
    updateIndex: (state, action) => {
      state.index = action.payload;
    }
  }
});

export const { addOne, updateOne, deleteOne, updateIndex } = listSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
// export const selectName = (state) => state.listItem.name;
export const selectList = (state) => state.list.list;
export const selectIndex = (state) => state.list.index;

export default listSlice.reducer;
