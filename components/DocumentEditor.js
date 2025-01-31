import React, { useRef, useEffect } from 'react';
import { PlateEditor } from '@udecode/plate';
import { useSelector, useDispatch } from 'react-redux';
import { setContent, saveVersion, undo, redo } from '@/store/documentSlice';
import { autoSave } from '../utils/autoSavePlaceholder';

const DocumentEditor = ({ documentId }) => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.document.content);
    const editHistoryIndex = useSelector(state => state.document.editHistoryIndex);
    const editHistory = useSelector(state => state.document.editHistory);

    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            dispatch(saveVersion(content));
        }
    }, [content, dispatch]);

    const handleUndo = () => {
        dispatch(undo());
    };

    const handleRedo = () => {
        dispatch(redo());
    };

    useEffect(() => {
        autoSave(content, documentId);
    }, [content]);

    return (
        <div>
            <button onClick={handleUndo} disabled={editHistoryIndex <= 0}>
                Undo
            </button>
            <button onClick={handleRedo} disabled={editHistoryIndex >= editHistory.length - 1}>
                Redo
            </button>
            <PlateEditor ref={editorRef} />
        </div>
    );
};

export default DocumentEditor;
