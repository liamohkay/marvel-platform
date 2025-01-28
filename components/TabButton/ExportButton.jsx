import React, { useState } from 'react';

import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { useSelector } from 'react-redux';
import styles from './ExportButton.module.css';

const ExportButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const markdownContent = useSelector(
    (state) => state.tools.editorState.markdownContent
  );

  const handleExportPDF = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.text(markdownContent, 10, 10);
    doc.save('document.pdf');
  };

  const handleExportText = () => {
    const blob = new Blob([markdownContent], {
      type: 'text/plain;charset=utf-8"#',
    });
    saveAs(blob, 'document.txt"#');
  };

  const handleExportHTML = () => {
    const blob = new Blob([`<html><body>${markdownContent}</body></html>`], {
      type: 'text/html;charset=utf-8',
    });
    saveAs(blob, 'document.html');
  };

  return (
    <div>
      <div className={styles.buttonContainer}>
        <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.38948 8.98354H6.45648C4.42148 8.98354 2.77148 10.6335 2.77148 12.6685V17.5435C2.77148 19.5775 4.42148 21.2275 6.45648 21.2275H17.5865C19.6215 21.2275 21.2715 19.5775 21.2715 17.5435V12.6585C21.2715 10.6295 19.6265 8.98354 17.5975 8.98354L16.6545 8.98354"
              stroke="#9E7EFF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.0215 2.19044V14.2314"
              stroke="#9E7EFF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.10645 5.11816L12.0214 2.19016L14.9374 5.11816"
              stroke="#9E7EFF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Export</span>
        </button>
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          <button
            className={styles.dropdownTex}
            type="button"
            onClick={handleExportPDF}
          >
            Export as PDF
          </button>
          <button
            className={styles.dropdownTex}
            type="button"
            onClick={handleExportText}
          >
            Export as Text
          </button>
          <button
            className={styles.dropdownTex}
            type="button"
            onClick={handleExportHTML}
          >
            Export as HTML
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
