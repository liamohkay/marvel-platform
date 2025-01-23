'use client';

import React from 'react';

import { PlateEditor } from './editor/plate-editor';

const DocumentEditor = ({ markdownContent }) => {
  return (
    <div className="document-editor h-full w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <div className="bg-gray-800 p-4 rounded-md shadow-md min-h-[400px] border border-gray-700">
        <PlateEditor markdownContent={markdownContent} />
      </div>
    </div>
  );
};

export default DocumentEditor;
