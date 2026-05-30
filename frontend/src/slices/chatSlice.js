import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      const stateNew = { ...state };
      stateNew.channels = action.payload;
      return stateNew;
    },
    setMessages: (state, action) => {
      const stateNew = { ...state };
      stateNew.messages = action.payload;
      return stateNew;
    },
    setCurrentChannelId: (state, action) => {
      const stateNew = { ...state };
      stateNew.currentChannelId = action.payload;
      return stateNew;
    },
    addMessage: (state, action) => ({
      ...state,
      messages: [...state.messages, action.payload],
    }),

  },
});

export const {
  setChannels,
  setMessages,
  setCurrentChannelId,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
