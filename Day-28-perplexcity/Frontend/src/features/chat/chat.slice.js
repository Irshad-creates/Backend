import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
    isGenerating: false,
  },
  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      console.log(`📌 Redux: Creating new chat ${chatId}`);
      state.chats[chatId] = {
        id: chatId,
        title,
        messages: [],
        lastUpdated: new Date().toISOString(),
      };
    },
    updateChatTitle: (state, action) => {
      const { chatId, title } = action.payload;

      if (state.chats[chatId]) {
        state.chats[chatId].title = title;
      }
    },
    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      // Ensure the chat exists before adding message
      if (!state.chats[chatId]) {
        console.warn(
          `⚠️  Redux: Chat ${chatId} does not exist in state, cannot add message`,
        );
        console.warn(`📊 Available chats:`, Object.keys(state.chats));
        return;
      }
      if (!state.chats[chatId].messages) {
        state.chats[chatId].messages = [];
      }
      console.log(`💬 Redux: Adding ${role} message to chat ${chatId}`);
      state.chats[chatId].messages.push({ content, role, id: Date.now() });
    },
    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      console.log(
        `📨 Redux: Adding ${messages.length} messages to chat ${chatId}`,
      );

      if (!state.chats[chatId]) {
        console.warn(`⚠️  Redux: Chat ${chatId} does not exist in state`);
        return;
      }

      state.chats[chatId].messages.push(...messages);
    },
    setChats: (state, action) => {
      console.log(
        `🔄 Redux: Setting ${Object.keys(action.payload).length} chats`,
      );
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      console.log(`🎯 Redux: Setting currentChatId to ${action.payload}`);
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setGenerating: (state, action) => {
      state.isGenerating = action.payload;
    },
    appendToMessage: (state, action) => {
      const { chatId, content } = action.payload;
      const messages = state.chats[chatId]?.messages;
      if (!messages || messages.length === 0) return;
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "ai") {
        lastMessage.content += content;
      }
    },
    removeChat: (state, action) => {
      delete state.chats[action.payload];
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  createNewChat,
  updateChatTitle,
  addNewMessage,
  addMessages,
  setGenerating,
  appendToMessage,
  removeChat,
} = chatSlice.actions;
export default chatSlice.reducer;
