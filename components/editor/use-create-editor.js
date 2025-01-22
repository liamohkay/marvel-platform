/* eslint-disable import/no-extraneous-dependencies */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkSlate from 'remark-slate';
import { withProps } from '@udecode/cn';
import {
  ParagraphPlugin,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';
import { BasicElementsPlugin } from '@udecode/plate-basic-elements/react';
import {
  BasicMarksPlugin,
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';

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

  return usePlateEditor({
    override: {
      components: {
        [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
        [ParagraphPlugin.key]: withProps(PlateElement, {
          as: 'p',
          className: 'mb-4',
        }),
        [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className: 'mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]',
        }),
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
      },
    },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
    value: parsedValue, // Use parsed Markdown here
  });
};
