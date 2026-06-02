import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  item: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const stateNew = { ...state };
      stateNew.type = action.payload.type;
      stateNew.item = action.payload.item;
      return stateNew;
    },
    closeModal: (state) => {
      const stateNew = { ...state };
      stateNew.type = null;
      stateNew.item = null;
      return stateNew;
    },
  },
});

export const {
  openModal,
  closeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
