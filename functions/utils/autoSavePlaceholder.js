import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { saveVersion } from '@/store/documentSlice';
import { store } from '@/store/index';

// Firebase configuration
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

/**
 * Auto-save function that updates Firestore with the latest content.
 * 
 * @param {string} newContent - The Markdown content from the editor
 * @param {string} documentId - Firestore document ID where editor state is stored
 */
export const autoSave = async (newContent, documentId) => {
    store.dispatch(saveVersion(newContent));

    const docRef = doc(db, 'editorState', documentId);
    try {
        await updateDoc(docRef, {
            markdownContent: newContent,
            lastEditedAt: new Date().toISOString(),
            editHistory: store.getState().document.editHistory,
        });

        console.log("Auto-saved to Firestore:", newContent);
    } catch (error) {
        console.error("Error saving to Firestore:", error);
    }
};
