'use client';

import React, { useState } from 'react';

import { Plate, usePlateEditor } from '@udecode/plate/react';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';

const initialValue = [
  {
    children: [
      {
        text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
      },
    ],
    type: 'p',
  },
];

export function PlateEditor({ markdownContent }) {
  const [debugValue, setDebugValue] = useState(initialValue);

  const localValue =
    typeof window !== 'undefined' && localStorage.getItem('editorContent');

  const editor = usePlateEditor({
    value: localValue ? JSON.parse(localValue) : initialValue,
  });

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        localStorage.setItem('editorContent', JSON.stringify(value));
        setDebugValue(value);
      }}
    >
      <EditorContainer>
        <Editor />
      </EditorContainer>
      
      {/* Debugging Section */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold">Debug Value:</h3>
        <pre className="text-sm bg-gray-200 p-2 rounded overflow-x-auto">
          {JSON.stringify(debugValue, null, 2)}
        </pre>
      </div>
    </Plate>
  );
}