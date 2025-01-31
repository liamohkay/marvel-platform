import { createSlice } from '@reduxjs/toolkit';

const MAX_HISTORY = 15;

const initialState = {
    content: "",
    editHistory: [],
    editHistoryIndex: -1
};

const documentSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        setContent: (state, action) => {
            state.content = action.payload;
        },
        saveVersion: (state, action) => {
            if (state.editHistory.length >= MAX_HISTORY) {
                state.editHistory.shift(); // Remove the oldest entry
            }
            state.editHistory.push(action.payload);
            state.editHistoryIndex = state.editHistory.length - 1;
        },
        undo: (state) => {
            if (state.editHistoryIndex > 0) {
                state.editHistoryIndex -= 1;
                state.content = state.editHistory[state.editHistoryIndex];
            }
        },
        redo: (state) => {
            if (state.editHistoryIndex < state.editHistory.length - 1) {
                state.editHistoryIndex += 1;
                state.content = state.editHistory[state.editHistoryIndex];
            }
        }
    }
});

export const { setContent, saveVersion, undo, redo } = documentSlice.actions;
export default documentSlice.reducer;
