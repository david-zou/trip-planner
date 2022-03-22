import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  index: null,
  toggle: false,
  operation: '',
};

export const listModalSlice = createSlice({
  name: 'listModal',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    populateAddModal: (state) => {
      state.operation = 'add';
    },
    populateUpdateModal: (state, action) => {
      state.index = action;
      state.operation = 'update';
    },
    showModalView: (state, action) => {
      state.toggle = true;
    },
    hideModalView: (state) => {
      console.log('hideModalView activated')
      state.index = null;
      state.toggle = false;
      state.operation = '';
    }
  }
});

export const { populateAddModal, populateUpdateModal, showModalView, hideModalView } = listModalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
// export const selectName = (state) => state.listItem.name;
export const selectModalIndex = (state) => state.listModal.index;
export const selectModalToggle = (state) => state.listModal.toggle;
export const selectModalOperation = (state) => state.listModal.operation;

export default listModalSlice.reducer;
