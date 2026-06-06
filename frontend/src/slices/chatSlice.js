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
    addChannel: (state, action) => ({
      ...state,
      channels: [...state.channels, action.payload],
    }),
    removeChannel: (state, action) => {
      const stateNew = { ...state };
      stateNew.channels = stateNew.channels
        .filter((channel) => channel.id !== action.payload.id);
      stateNew.messages = stateNew.messages
        .filter((message) => message.channelId !== action.payload.id);
      return stateNew;
    },
    renameChannel: (state, action) => {
      const stateNew = { ...state };
      stateNew.channels = stateNew.channels
        .map((item) => (item.id === action.payload.id ? action.payload : item));
      return stateNew;
    },

  },
});

export const {
  setChannels,
  setMessages,
  setCurrentChannelId,
  addMessage,
  addChannel,
  removeChannel,
  renameChannel,
} = chatSlice.actions;

export default chatSlice.reducer;
