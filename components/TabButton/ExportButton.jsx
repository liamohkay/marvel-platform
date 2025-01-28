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

  const cleanText = (text) => {
    return text
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove any lingering HTML tags
      .replace(/\*/g, '') // Remove markdown bold/italic markers (*)
      .replace(/&nbsp;/g, ' ') // Replace any encoded spaces
      .replace(/\s+/g, ' ') // Normalize excessive spaces
      .trim(); // Trim extra spaces from start and end
  };

  const handleExportPDF = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();

    doc.setFont('courier');
    const marginLeft = 10;
    const pageWidth = doc.internal.pageSize.getWidth() - 20;

    const formattedText = cleanText(markdownContent)
      .split('\n')
      .map((line) => `  ${line}`);
    const wrappedText = doc.splitTextToSize(formattedText, pageWidth);

    // doc.text(markdownContent, 10, 10);
    doc.text(wrappedText, marginLeft, 10, { align: 'left' });
    doc.save('document.pdf');
  };

  const handleExportText = () => {
    const formattedText = cleanText(markdownContent).replace(/\n/g, '\r\n');

    const blob = new Blob([formattedText], {
      type: 'text/plain;charset=utf-8"#',
    });
    saveAs(blob, 'document.txt"#');
  };

  const handleExportHTML = () => {
    const formattedHTML = `<html>
    <head><title>Exported Document</title></head>
    <body style="font-family: Arial, sans-serif; white-space: pre-wrap;">
      <pre>${cleanText(markdownContent)}</pre>
    </body>
  </html>`;

    const blob = new Blob([formattedHTML], {
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
          <p className={styles.buttonText}>Export</p>
        </button>
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          <button
            className={styles.dropdownBtn}
            type="button"
            onClick={handleExportPDF}
          >
            Export as PDF
          </button>
          <button
            className={styles.dropdownBtn}
            type="button"
            onClick={handleExportText}
          >
            Export as Text
          </button>
          <button
            className={styles.dropdownBtn}
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
