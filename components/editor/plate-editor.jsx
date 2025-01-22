'use client';

import { Plate } from '@udecode/plate/react';
import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { BlockquoteElement } from '@/components/plate-ui/blockquote-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { ListElement } from '@/components/plate-ui/list-element';

export function PlateEditor({ markdownContent }) {
  const editor = useCreateEditor(markdownContent);

  return (
    <Plate
      editor={editor}
      components={{
        blockquote: BlockquoteElement,
        paragraph: ParagraphElement,
        list: ListElement,
      }}
    >
      <EditorContainer className="p-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg">
        <Editor
          variant="demo"
          placeholder="Start typing here..."
          className="min-h-[300px] focus:outline-none"
        />
      </EditorContainer>
    </Plate>
  );
}
