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
import { ListPlugin } from '@udecode/plate-list/react';
import { ListElement } from '../plate-ui/list-element';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { Editor, EditorContainer } from '../plate-ui/editor';

export function PlateEditor({ markdownContent, onEditorReady }) {
  const [debugValue, setDebugValue] = useState([]);

  const editorInstance = createPlateEditor({
    plugins: [
      BlockquotePlugin,
      ListPlugin,
      HeadingPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      CodePlugin,
      StrikethroughPlugin,
      MarkdownPlugin,
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
          className: 'my-1 border-l-2 pl-6 italic',
        }),
        ul: withProps(ListElement, { variant: 'ul', className: 'slate-answers' }),
        ol: withProps(ListElement, { variant: 'ol', className: 'slate-answers' }),
        bold: withProps(PlateLeaf, { as: 'strong' }),
        h1: withProps(PlateElement, {
          as: 'h1',
          className: 'mt-[1.6em] pb-1 font-heading text-4xl font-bold',
        }),
        h2: withProps(PlateElement, {
          as: 'h2',
          className:
            'mt-[1.4em] pb-px font-heading text-2xl font-semibold tracking-tight',
        }),
        h3: withProps(PlateElement, {
          as: 'h3',
          className:
            'mt-[1em] pb-px font-heading text-xl font-semibold tracking-tight slate-h3',
        }),
        h4: withProps(PlateElement, {
          as: 'h4',
          className:
            'mt-[0.75em] font-heading text-lg font-semibold tracking-tight',
        }),
        h5: withProps(PlateElement, {
          as: 'h5',
          className: 'mt-[0.75em] text-lg font-semibold tracking-tight',
        }),
        h6: withProps(PlateElement, {
          as: 'h6',
          className: 'mt-[0.75em] text-base font-semibold tracking-tight',
        }),
        italic: withProps(PlateLeaf, { as: 'em' }),
        p: withProps(PlateElement, {
          as: 'p',
          className: 'mb-4 slate-p',
        }),
        underline: withProps(PlateLeaf, { as: 'u' }),
      },
    },
    plugins: [
      BlockquotePlugin,
      ListPlugin,
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

  // Call onEditorReady with the editor instance when it's available
  useEffect(() => {
    if (onEditorReady && editor) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        localStorage.setItem('editorContent', JSON.stringify(value));
        setDebugValue(value);
      }}
    >
      <div className='slate-quiz-container'>
        <EditorContainer>
          <Editor
            placeholder="Type here..."
            autoFocus={false}
            spellCheck={false}
          />
        </EditorContainer>
      </div>

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
