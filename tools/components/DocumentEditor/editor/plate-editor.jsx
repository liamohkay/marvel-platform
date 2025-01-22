'use client';

import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { withProps } from '@udecode/cn';
import {
  createPlateEditor,
  Plate,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { Editor, EditorContainer } from '../plate-ui/editor';

export function PlateEditor({ markdownContent }) {
  const [debugValue, setDebugValue] = useState([]);

  // Create a Plate Editor instance
  const editorInstance = createPlateEditor({
    plugins: [
      BlockquotePlugin,
      HeadingPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      CodePlugin,
      StrikethroughPlugin,
      MarkdownPlugin, // Add Markdown support
    ],
  });

  // Deserialize raw Markdown content into editor value
  const parsedMarkdownContent = markdownContent
    ? editorInstance.api.markdown.deserialize(markdownContent)
    : [];

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
      StrikethroughPlugin,
      MarkdownPlugin,
    ],
    value: parsedMarkdownContent || [],
  });

  useEffect(() => {
    if (markdownContent) {
      const content = editorInstance.api.markdown.deserialize(markdownContent);
      setDebugValue(content);
    }
  }, [markdownContent]);

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
      {/*
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold">Debug Value:</h3>
        <pre className="text-sm bg-gray-200 p-2 rounded overflow-x-auto">
          {JSON.stringify(debugValue, null, 2)}
        </pre>
      </div>
      */}
    </Plate>
  );
}
