import React, { useState } from 'react';

import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

import { useSelector } from 'react-redux';

import GradientOutlinedButton from '../GradientOutlinedButton';

import styles from './ExportButton.module.css';

import { ReactComponent as ExportIcon } from '../../assets/svg/export-icon.svg';

const ExportButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const markdownContent = useSelector(
    (state) => state.tools.editorState.markdownContent
  );

  // Helper function used for additonal formatting of the exported document.
  const cleanText = (text) => {
    return text
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove any lingering HTML tags
      .replace(/&nbsp;/g, ' ') // Replace any encoded spaces
      .replace(/###/g, ' '); // Replace any encoded spaces
  };

  // Handle function for exporting in PDF format
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

  // Handle function for exporting in text format
  const handleExportText = () => {
    const formattedText = cleanText(markdownContent).replace(/\n/g, '\r\n');

    const blob = new Blob([formattedText], {
      type: 'text/plain;charset=utf-8"#',
    });
    saveAs(blob, 'document.txt');
  };

  // Handle function for exporting in HTML format
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
        <GradientOutlinedButton
          id="export-button"
          text="Export"
          icon={<ExportIcon width={24} height={24} />}
          iconPlacement="left"
          clickHandler={() => setShowDropdown(!showDropdown)}
          color="primary" // Change this based on your theme settings
          inverted // Set as needed
          disabled={false} // Adjust based on logic
          loading={false} // Adjust based on logic
        />
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          <GradientOutlinedButton
            text="Export as PDF"
            clickHandler={handleExportPDF}
            color="secondary"
            inverted={false}
            disabled={false}
          />
          <GradientOutlinedButton
            text="Export as Text"
            clickHandler={handleExportText}
            color="secondary"
            inverted={false}
            disabled={false}
          />
          <GradientOutlinedButton
            text="Export as HTML"
            clickHandler={handleExportHTML}
            color="secondary"
            inverted={false}
            disabled={false}
          />
        </div>
      )}
    </div>
  );
};

export default ExportButton;
