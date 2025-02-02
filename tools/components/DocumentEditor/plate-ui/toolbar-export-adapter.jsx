// tools/components/DocumentEditor/plate-ui/toolbar-export-adapter.jsx
import React from 'react';

import { cn } from '@udecode/cn';

import EditorExport from '@/tools/components/EditorExport/EditorExport';

const ToolbarExportAdapter = ({ editor }) => {
  const content = editor?.children;

  return (
    <div className="slate-toolbar-group">
      <div
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-white/80',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
        )}
      >
        <EditorExport toolId="editor" content={content} />
      </div>
    </div>
  );
};

export default ToolbarExportAdapter;
