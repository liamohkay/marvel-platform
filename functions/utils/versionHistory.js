import { saveVersion } from '@/store/documentSlice';

/**
 * Saves a new version in the Redux store.
 * 
 * @param {object} store - Redux store dispatch function.
 * @param {string} currentContent - The Markdown content to save.
 */
export const saveVersionToHistory = (store, currentContent) => {
    const timestamp = new Date().toISOString(); // Generate a timestamp for tracking

    // Dispatch to Redux store to track history
    store.dispatch(saveVersion({ content: currentContent, timestamp }));
};
