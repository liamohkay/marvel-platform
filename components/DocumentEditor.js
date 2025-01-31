// file: components/DocumentEditor.js
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContent, undo, redo } from '../store/editorSlice';
import { PlateEditor, useEditorState } from '@udecode/plate';
import { autoSave } from '../utils/autoSavePlaceholder';
import { useHistoryPlugin } from '@udecode/plate-history';
import styled from 'styled-components';

// Styled buttons
const Button = styled.button`
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    margin: 5px;
    cursor: pointer;
    border-radius: 5px;

    &:disabled {
        background: gray;
        cursor: not-allowed;
    }
`;

const DocumentEditor = ({ documentId }) => {
    const dispatch = useDispatch();
    const editorState = useSelector((state) => state.editor);
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
     * Handles content changes and updates Redux + Firestore
     */
    const handleChange = (newContent) => {
        dispatch(setContent(newContent));
        autoSave(newContent, documentId);
    };

    /**
     * Handles Undo action
     */
    const handleUndo = () => {
        dispatch(undo());
        autoSave(editorState.markdownContent, documentId, true);
    };

    /**
     * Handles Redo action
     */
    const handleRedo = () => {
        dispatch(redo());
        autoSave(editorState.markdownContent, documentId, true);
    };

    return (
        <div>
            <Button onClick={handleUndo} disabled={editorState.editHistoryIndex <= 0}>
                Undo
            </Button>
            <Button onClick={handleRedo} disabled={editorState.editHistoryIndex >= editorState.editHistory.length - 1}>
                Redo
            </Button>
            <PlateEditor ref={editorRef} value={editorState.markdownContent} onChange={handleChange} />
        </div>
    );
};

export default DocumentEditor;
