import { createSlice } from '@reduxjs/toolkit';

import fetchTools from '@/libs/redux/thunks/tools';

const toolsState = {
  data: null,
  loading: true,
  error: null,
};

const communicator = {
  prompt: null,
  response: null,
  editorState: {
    markdownContent: null,
    editHistory: [],
    /* 
      {
        "content": string
        "timestamp": timestamp,
        "type": "initial" | "auto-save" | "manual-save" | "restore"
      }
    */
  },
  communicatorLoading: false,
  formOpen: true,
};

const initialState = {
  ...toolsState,
  ...communicator,
};

const tools = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    reset: () => initialState,
    resetCommunicator: (state) => ({ ...state, ...communicator }),
    setCommunicatorLoading: (state, action) => {
      state.communicatorLoading = action.payload;
    },
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setFormOpen: (state, action) => {
      state.formOpen = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setMarkdownContent: (state, action) => {
      state.editorState.markdownContent = action.payload;
    },
    addStateToEditHistory: (state, action) => {
      if (state.editorState.editHistory.length >= 15) state.editorState.editHistory.shift();
      state.editorState.editHistory.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTools.rejected, (state) => {
        state.error = 'Could not get tools';
        state.loading = false;
      });
  },
});

export default tools;
