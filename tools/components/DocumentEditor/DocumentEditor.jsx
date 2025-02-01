'use client';

import React, { useState } from 'react';

import { PlateEditor } from './editor/plate-editor';
import { EditorToolbar } from './plate-ui/toolbar';

const DocumentEditor = ({ markdownContent }) => {
  const [editor, setEditor] = useState(null);

  return (
    <div className="document-editor h-full w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      {/* Toolbar Container */}
      <div className="mb-4">
        <EditorToolbar editor={editor} />
      </div>

      <div className="bg-gray-800 p-4 rounded-md shadow-md min-h-[400px] border border-gray-700">
        <PlateEditor 
          markdownContent={markdownContent} 
          onEditorReady={(editorInstance) => {
            console.log('Editor instance received:', editorInstance);
            setEditor(editorInstance);
          }}
        />
      </div>
    </div>
  );
};

export default DocumentEditor;
