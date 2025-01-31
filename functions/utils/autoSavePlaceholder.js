// file: utils/autoSavePlaceholder.js
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { store } from '../store/store';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const autoSave = async (newContent, documentId, isUndoRedo = false) => {
    if (!isUndoRedo) {
        const editorState = store.getState().editor;
        const docRef = doc(db, 'editorState', documentId);

        try {
            await updateDoc(docRef, {
                markdownContent: newContent,
                lastEditedAt: new Date().toISOString(),
                editHistory: editorState.editHistory,
            });

            console.log("Auto-saved to Firestore:", newContent);
        } catch (error) {
            console.error("Error saving to Firestore:", error);
        }
    }
};
