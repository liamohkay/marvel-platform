// utils/autoSavePlaceholder.js

import 'dotenv/config';
import {saveVersionToHistory} from './versionHistory.js';
import {getFirestore, doc, updateDoc} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';

// firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APP_ID,
  };
  

// to initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize Firestore
const db = getFirestore(app);  

let editHistory = []; // array to hold version history
let lastSavedContent = ""; // to track the last saved version

/**
 * auto-save function that updates Firestore with the latest content
 * 
 * @param {string} newContent - this is the current Markdown content from the editor
 * @param {string} documentId - Firestore document ID where editor state is stored
 */

export const autoSave = async (newContent, documentId) =>
{
    // check if content has changed
    if (newContent !== lastSavedContent)
    {
        //save the new version to history
        editHistory = saveVersionToHistory(editHistory, newContent);
        
        // update Firestore with the new content and edit history 
        const docRef = doc(db, 'editorState', documentId);
        try
        {
            //update Firestore document
            await updateDoc(docRef, {
                markdownContent: newContent,
                lastEditedAt: new Date().toISOString(),
                editHistory: editHistory, //this saves version history
            });

            //success message
            console.log("Auto-saved to Firestore:",
                {
                    markdownContent: newContent,
                    lastEditedAt: new Date().toISOString(),
                    editHistory,
                });

                // update lastSavedContent
                lastSavedContent = newContent;
        }
        catch (error)
        {
            console.error("Error saving to Firestore:", error);
        }
    }
};

// Simulate multiple auto-save events
const testDocumentId = 'mfQbmteh9nqF6Qr2D2Hf';
const testContents = [
  'Version 1',
  'Version 2',
  'Version 3',
  'Version 4',
  'Version 5',
  'Version 6',
  'Version 7',
  'Version 8',
  'Version 9',
  'Version 10',
  'Version 11',
  'Version 12',
  'Version 13',
  'Version 14',
  'Version 15',
  'Version 16', // This will push out "Version 1"
  'Version 17', // This will push out "Version 2"
];

// this simulate a delay between saves to mimic real auto-save
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const runTest = async () => {
  for (let i = 0; i < testContents.length; i++) {
    await autoSave(testContents[i], testDocumentId);
    console.log(`Saved: ${testContents[i]}`);
    console.log(`Current Edit History (Length: ${editHistory.length}):`, editHistory);
    await delay(500); // Delay to simulate time between saves
  }
};

runTest();
