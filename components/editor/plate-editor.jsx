'use client';

import React, { useState } from 'react';

import { withProps } from '@udecode/cn';
import {
  Plate,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';
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
    override: {
      components: {
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className: 'mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]',
        }),
        bold: withProps(PlateLeaf, { as: 'strong' }),
        h1: withProps(PlateElement, {
          as: 'h1',
          className:
            'mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl',
        }),
        h2: withProps(PlateElement, {
          as: 'h2',
          className: 'mb-4 mt-6 text-2xl font-semibold tracking-tight',
        }),
        h3: withProps(PlateElement, {
          as: 'h3',
          className: 'mb-4 mt-6 text-xl font-semibold tracking-tight',
        }),
        italic: withProps(PlateLeaf, { as: 'em' }),
        p: withProps(PlateElement, {
          as: 'p',
          className: 'mb-4',
        }),
        underline: withProps(PlateLeaf, { as: 'u' }),
      },
    },
    plugins: [
      BlockquotePlugin,
      HeadingPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      CodePlugin,
    ],
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
        <Editor
          placeholder="Type here..."
          autoFocus={false}
          spellCheck={false}
        />
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