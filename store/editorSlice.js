// file: store/editorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const MAX_HISTORY = 15;

const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        markdownContent: '',
        editHistory: [],
        editHistoryIndex: -1,
    },
    reducers: {
        setContent: (state, action) => {
            const newContent = action.payload;

            if (state.markdownContent !== newContent) {
                // Ensure history does not exceed MAX_HISTORY
                if (state.editHistory.length >= MAX_HISTORY) {
                    state.editHistory.shift();
                }

                // Add new version to history
                state.editHistory.push(newContent);
                state.editHistoryIndex = state.editHistory.length - 1;
                state.markdownContent = newContent;
            }
        },
        undo: (state) => {
            if (state.editHistoryIndex > 0) {
                state.editHistoryIndex -= 1;
                state.markdownContent = state.editHistory[state.editHistoryIndex];
            }
        },
        redo: (state) => {
            if (state.editHistoryIndex < state.editHistory.length - 1) {
                state.editHistoryIndex += 1;
                state.markdownContent = state.editHistory[state.editHistoryIndex];
            }
        }
    }
});

export const { setContent, undo, redo } = editorSlice.actions;
export default editorSlice.reducer;
