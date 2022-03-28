import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggle: false,
};

export const listModalSlice = createSlice({
  name: 'listModal',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showModalView: (state, action) => {
      state.toggle = true;
    },
    hideModalView: (state) => {
      state.toggle = false;
    }
  }
});

export const { showModalView, hideModalView } = listModalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
// export const selectName = (state) => state.listItem.name;
// export const selectModalIndex = (state) => state.listModal.index;
export const selectModalToggle = (state) => state.listModal.toggle;
// export const selectModalOperation = (state) => state.listModal.operation;

export default listModalSlice.reducer;
