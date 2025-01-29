// file location: components/DocumentEditor.js

import React, { useState, useRef, useEffect } from 'react';
import { PlateEditor, useEditorState } from '@udecode/plate';
import { autoSave } from '../utils/autoSavePlaceholder';
import { saveVersionToHistory } from '../utils/versionHistory';
import { useHistoryPlugin } from '@udecode/plate-history';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

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

const DocumentEditor = ({ documentId }) => {
    const [editorState, setEditorState] = useState({
        markdownContent: "",
        lastEditedAt: null,
        editHistory: [],
        editHistoryIndex: -1,
    });

    // Reference to the editor instance
    const editorRef = useRef(null);

    // Initialize Plate.js with history plugin
    const editor = useEditorState({
        plugins: [useHistoryPlugin()],
    });

    // Assign editor instance to ref
    useEffect(() => {
        editorRef.current = editor;
    }, [editor]);

    /**
     * Handles Undo action
     */
    const handleUndo = () => {
        if (!editorRef.current) return;

        editorRef.current.undo(); // Plate.js Undo

        setEditorState((prevState) => {
            if (prevState.editHistoryIndex > 0) {
                const newIndex = prevState.editHistoryIndex - 1;
                return {
                    ...prevState,
                    markdownContent: prevState.editHistory[newIndex].content,
                    editHistoryIndex: newIndex,
                };
            }
            return prevState;
        });

        updateFirestoreWithCurrentState(true);
    };

    /**
     * Handles Redo action
     */
    const handleRedo = () => {
        if (!editorRef.current) return;

        editorRef.current.redo(); // Plate.js Redo

        setEditorState((prevState) => {
            if (prevState.editHistoryIndex < prevState.editHistory.length - 1) {
                const newIndex = prevState.editHistoryIndex + 1;
                return {
                    ...prevState,
                    markdownContent: prevState.editHistory[newIndex].content,
                    editHistoryIndex: newIndex,
                };
            }
            return prevState;
        });

        updateFirestoreWithCurrentState(true);
    };

    /**
     * Updates Firestore with the current editor state.
     * @param {boolean} isUndoRedo - If true, prevents redundant saves during undo/redo.
     */
    const updateFirestoreWithCurrentState = async (isUndoRedo = false) => {
        const { markdownContent, lastEditedAt, editHistory } = editorState;
        const docRef = doc(db, 'editorState', documentId);

        try {
            await updateDoc(docRef, {
                markdownContent,
                lastEditedAt: new Date().toISOString(),
                editHistory,
            });

            console.log("Updated Firestore with Undo/Redo action:", markdownContent);
        } catch (error) {
            console.error("Error updating Firestore:", error);
        }
    };

    return (
        <div>
            <button onClick={handleUndo} disabled={editorState.editHistoryIndex <= 0}>Undo</button>
            <button onClick={handleRedo} disabled={editorState.editHistoryIndex >= editorState.editHistory.length - 1}>Redo</button>
            <PlateEditor ref={editorRef} />
        </div>
    );
};

export default DocumentEditor;
