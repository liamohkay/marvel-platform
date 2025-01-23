'use client';

import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchToolHistory, actions as toolActions } from '@/tools/data';

const { addStateToEditHistory } = toolActions;

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
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HeadingPlugin } from '@udecode/plate-heading/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { Editor, EditorContainer } from '../plate-ui/editor';
import { IndentPlugin } from '@udecode/plate-indent/react';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { ParagraphPlugin } from '@udecode/plate/react';


import { EDIT_HISTORY_TYPES } from '@/tools/libs/constants/editor';

export function PlateEditor({ markdownContent }) {
  const [debugValue, setDebugValue] = useState([]);
  const dispatch = useDispatch();

  const editorInstance = createPlateEditor({
    plugins: [
      BlockquotePlugin,
      ParagraphPlugin,
      HeadingPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      CodePlugin,
      StrikethroughPlugin,
      MarkdownPlugin,
      HeadingPlugin,
      IndentPlugin.configure({
        inject: {
          targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
        },
      }),
      IndentListPlugin.configure({
        inject: {
          targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
        },
      }),
    ],
  });

  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => callback(...args), wait);
    };
  };

  console.log('Parsed Markdown:', parsedMarkdownContent);
  const editor = usePlateEditor({
    override: {
      components: {
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className: 'my-1 border-l-2 pl-6 italic',
        }),
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
            'mt-[1em] pb-px font-heading text-xl font-semibold tracking-tight',
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
          className: 'mb-4',
        }),
        underline: withProps(PlateLeaf, { as: 'u' }),
      },
    },
    plugins: [
      BlockquotePlugin,
      ParagraphPlugin,
      HeadingPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      CodePlugin,
      StrikethroughPlugin,
      MarkdownPlugin,
      HeadingPlugin,
      IndentPlugin.configure({
        inject: {
          targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
        },
      }),
      IndentListPlugin.configure({
        inject: {
          targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
        },
      }),
    ],
  });

  const handleAutosave = debounce((editorContent) => {
    // Serialize platejs editor content to markdown for state save
    const editorMarkdown = editor.api.markdown.serialize(editorContent)

    const newHistoryEntry = {
      timestamp: Date.now(),
      content: editorMarkdown,
      type: EDIT_HISTORY_TYPES.AUTO_SAVE,
    };

    dispatch(addStateToEditHistory(newHistoryEntry)); // Save to state
    // axios.post(FIREBASE_FUNCTION_URL, newHistoryEntry); // Save to firestore
  }, 2000);

  useEffect(() => {
    if (markdownContent) {
      const content = editorInstance.api.markdown.deserialize(markdownContent);
      setDebugValue(content);

      // Update editor's internal state
      editor.children = content;
      editor.onChange();
    }
  }, [markdownContent]);

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => handleAutosave(value)}
    >
      <EditorContainer>
        <Editor
          placeholder="Type here..."
          autoFocus={false}
          spellCheck={false}
        />
      </EditorContainer>
    </Plate>
  );
}
