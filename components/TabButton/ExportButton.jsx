import React, { useState } from 'react';

import IosShareIcon from '@mui/icons-material/IosShare';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

const ExportButton = ({ content }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save('document.pdf');
  };

  const handleExportText = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8"#' });
    saveAs(blob, 'document.txt"#');
  };

  const handleExportHTML = () => {
    const blob = new Blob([`<html><body>${content}</body></html>`], {
      type: 'text/html;charset=utf-8',
    });
    saveAs(blob, 'document.html');
  };

  return (
    <div className="export-container">
      <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
        {IosShareIcon}Export
      </button>

      {showDropdown && (
        <div>
          <button type="button" onClick={handleExportPDF}>
            Export as PDF
          </button>
          <button type="button" onClick={handleExportText}>
            Export as Text
          </button>
          <button type="button" onClick={handleExportHTML}>
            Export as HTML
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
