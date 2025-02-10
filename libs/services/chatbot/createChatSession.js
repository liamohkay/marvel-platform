import { httpsCallable } from 'firebase/functions';
import {
  setError,
  setStreaming,
  setTyping,
} from '@/libs/redux/slices/chatSlice';
import { functions } from '@/libs/redux/store';

/**
 * Creates a chat session.
 *
 * @param {Object} payload - The payload for creating the chat session.
 * @param {function} dispatch - The dispatch function for managing state.
 * @return {Object} - An object containing a status and data containing the session.
 */
const createChatSession = async (payload, dispatch) => {
  try {
    console.log('Payload:', payload); // Log the payload for debugging
    const createSession = httpsCallable(functions, 'createChatSession');
    const response = await createSession(payload);

    return response.data;
  } catch (err) {
    console.error('Firebase Error:', err); // Log the full error
    const errorMessage = err.message || 'Error! Couldn\u0027t send message';
    dispatch(setError(errorMessage));
    dispatch(setStreaming(false));
    dispatch(setTyping(false));
    setTimeout(() => {
      dispatch(setError(null));
    }, 3000);
    throw new Error(errorMessage); // Use the actual error message
  }
};

export default createChatSession;