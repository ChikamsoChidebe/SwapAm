import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ChatRoom, ChatMessage } from '../../types';
import { chatAPI } from '../../services/api';

interface ChatState {
  rooms: ChatRoom[];
  currentRoom: ChatRoom | null;
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  typing: string[];
}

const initialState: ChatState = {
  rooms: [],
  currentRoom: null,
  messages: [],
  loading: false,
  error: null,
  typing: [],
};

export const fetchChatRooms = createAsyncThunk(
  'chat/fetchRooms',
  async () => {
    const response = await chatAPI.getChatRooms();
    return response.data;
  }
);

export const fetchChatRoom = createAsyncThunk(
  'chat/fetchRoom',
  async (roomId: string) => {
    const response = await chatAPI.getChatRoom(roomId);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ roomId, content, type }: { roomId: string; content: string; type?: string }) => {
    const response = await chatAPI.sendMessage(roomId, { content, type: type || 'text' });
    return response.data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentRoom: (state, action: PayloadAction<ChatRoom | null>) => {
      state.currentRoom = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    setTyping: (state, action: PayloadAction<string[]>) => {
      state.typing = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch chat rooms';
      })
      .addCase(fetchChatRoom.fulfilled, (state, action) => {
        state.currentRoom = action.payload.room;
        state.messages = action.payload.messages;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { setCurrentRoom, addMessage, setTyping, clearMessages, clearError } = chatSlice.actions;
export default chatSlice.reducer;