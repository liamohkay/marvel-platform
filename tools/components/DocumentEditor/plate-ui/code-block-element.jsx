'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';
import { formatCodeBlock, isLangSupported } from '@udecode/plate-code-block';
import { useCodeBlockElementState } from '@udecode/plate-code-block/react';
import { BracesIcon } from 'lucide-react';

import { Button } from './button';
import { CodeBlockCombobox } from './code-block-combobox';
import { PlateElement } from './plate-element';

export const CodeBlockElement = withRef(
  ({ children, className, ...props }, ref) => {
    const { element } = props;

    const state = useCodeBlockElementState({ element });

    return (
      <PlateElement
        ref={ref}
        className={cn(className, 'py-1', state.className)}
        {...props}
      >
        <pre className="overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2]">
          <code>{children}</code>
        </pre>

        {state.syntax && (
          <div
            className="absolute top-2 right-2 z-10 flex items-center gap-1 select-none"
            contentEditable={false}
          >
            <CodeBlockFormatButton {...props} />
            <CodeBlockCombobox />
          </div>
        )}
      </PlateElement>
    );
  }
);

export function CodeBlockFormatButton({ editor, element }) {
  if (!isLangSupported(element.lang)) {
    return null;
  }

  return (
    <Button
      size="xs"
      variant="ghost"
      className="h-5 justify-between px-1 text-xs"
      onClick={() => formatCodeBlock(editor, { element })}
      title="Format code"
    >
      <BracesIcon className="text-gray-500" />
    </Button>
  );
}
