import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const stateNew = { ...state };
      stateNew.token = action.payload.token;
      stateNew.username = action.payload.username
      localStorage.setItem('token', action.payload);
      localStorage.setItem('username', action.payload.username);
      return stateNew;
    },
    logOut: (state) => {
      const stateNew = { ...state };
      stateNew.token = null;
      localStorage.removeItem('token');
      return stateNew;
    },
  },
});

export const {
  logIn,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;
