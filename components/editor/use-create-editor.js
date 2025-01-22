/* eslint-disable import/no-extraneous-dependencies */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkSlate from 'remark-slate';
import { createPlateEditor } from '@udecode/plate/react';
import {
  ParagraphPlugin,
  PlateElement,
  PlateLeaf,
} from '@udecode/plate/react';
import { BasicElementsPlugin } from '@udecode/plate-basic-elements/react';
import {
  BasicMarksPlugin,
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { ListPlugin } from '@udecode/plate-list/react';

// Utility function to parse Markdown into Slate-compatible value
const parseMarkdownToSlate = (markdown) => {
  try {
    return unified().use(remarkParse).use(remarkSlate).processSync(markdown)
      .result;
  } catch (error) {
    console.error('Error parsing Markdown:', error);
    return [
      {
        type: 'paragraph',
        children: [{ text: 'Failed to parse Markdown content.' }],
      },
    ];
  }
};

export const useCreateEditor = (markdownContent = '') => {
  const parsedValue = parseMarkdownToSlate(markdownContent);

  return createPlateEditor({
    plugins: [
      BasicElementsPlugin,
      BasicMarksPlugin,
      BlockquotePlugin,
      HeadingPlugin,
      ListPlugin,
    ],
    components: {
      [BoldPlugin.key]: PlateLeaf,
      [ItalicPlugin.key]: PlateLeaf,
      [UnderlinePlugin.key]: PlateLeaf,
      [StrikethroughPlugin.key]: PlateLeaf,
      [ParagraphPlugin.key]: PlateElement,
      blockquote: PlateElement,
      h1: PlateElement,
      h2: PlateElement,
      h3: PlateElement,
      list: PlateElement,
    },
    value: parsedValue, // Parsed Markdown
  });
};