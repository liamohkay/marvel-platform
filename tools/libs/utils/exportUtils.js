import { jsPDF as JsPDF } from 'jspdf';

// Markdown parsing
const markdownUtils = {
  entities: {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': '"',
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&ndash;': '–',
    '&mdash;': '—',
  },

  patterns: {
    heading: /^(#{1,6})\s+(.+)$/,
    listItem: /^(\s*(?:[-*+]|\d+\.)\s+)(.+)$/,
    codeBlock: /^```(\w*)\n([\s\S]*?)```$/,
    emphasis: /(\*\*|__)(.*?)\1/,
    horizontalRule: /^[-*_]{3,}$/,
  },

  decodeEntities(text) {
    return text.replace(
      /&[^;]+;/g,
      (entity) => this.entities[entity] || entity
    );
  },

  parseElement(line) {
    const patterns = Object.keys(this.patterns);
    for (let i = 0; i < patterns.length; i += 1) {
      const type = patterns[i];
      const match = line.match(this.patterns[type]);

      if (match) {
        switch (type) {
          case 'heading':
            return {
              type: 'heading',
              level: match[1].length,
              content: this.decodeEntities(match[2]),
              raw: line,
            };
          case 'listItem':
            return {
              type: 'listItem',
              indent: match[1].length,
              content: this.decodeEntities(match[2]),
              raw: line,
            };
          default:
            return {
              type: 'text',
              content: this.decodeEntities(line),
              raw: line,
            };
        }
      }
    }

    return {
      type: 'text',
      content: this.decodeEntities(line),
      raw: line,
    };
  },

  parse(markdown) {
    return markdown.split('\n').map((line) => this.parseElement(line));
  },
};

// HTML conversion
const htmlUtils = {
  styles: {
    body: 'font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;',
    heading: 'font-weight: bold;',
    text: 'margin: 0;',
    listItem: 'margin: 0;',
  },

  convertElement(element) {
    switch (element.type) {
      case 'heading':
        return `<h${element.level} style="${this.styles.heading}">${element.content}</h${element.level}>`;
      case 'listItem':
        return `<p style="${this.styles.text}${' '.repeat(element.indent)}${
          element.content
        }</p>`;
      default:
        return `<p style="${this.styles.text}">${element.content}</p>`;
    }
  },

  convert(elements) {
    const html = elements
      .map((element) => this.convertElement(element))
      .join('\n');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>body { ${this.styles.body} }</style>
        </head>
        <body>${html}</body>
      </html>
    `;
  },
};

// PDF conversion
const pdfUtils = {
  createPDFDocument() {
    const doc = new JsPDF();
    return {
      doc,
      y: 20,
      pageHeight: doc.internal.pageSize.height,
      pageWidth: doc.internal.pageSize.width,
      margin: 20,
    };
  },

  setFont(doc, element) {
    switch (element.type) {
      case 'heading':
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14 - (element.level - 1));
        break;
      default:
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
    }
  },

  addText(context, element) {
    this.setFont(context.doc, element);

    const maxWidth = context.pageWidth - context.margin * 2;
    const textLines = context.doc.splitTextToSize(element.content, maxWidth);

    if (
      context.y + textLines.length * 10 >
      context.pageHeight - context.margin
    ) {
      context.doc.addPage();
      context.y = 20;
    }

    context.doc.text(textLines, context.margin, context.y);
    context.y += textLines.length * 10;
  },

  convert(elements) {
    const context = this.createPDFDocument();
    elements.forEach((element) => this.addText(context, element));
    return context.doc.output('blob');
  },
};

// Plain text conversion
const plainTextUtils = {
  convertElement(element) {
    switch (element.type) {
      case 'heading':
        return element.content;
      case 'listItem':
        return `${' '.repeat(element.indent)}${element.content}`;
      default:
        return element.content;
    }
  },

  convert(elements) {
    return elements.map((element) => this.convertElement(element)).join('\n');
  },
};

const EXPORT_FORMATS = {
  pdf: {
    extension: 'pdf',
    convert: async (markdown) => {
      const elements = markdownUtils.parse(markdown);
      return pdfUtils.convert(elements);
    },
  },
  plaintext: {
    extension: 'txt',
    convert: (markdown) => {
      const elements = markdownUtils.parse(markdown);
      const text = plainTextUtils.convert(elements);
      return new Blob([text], { type: 'text/plain' });
    },
  },
  html: {
    extension: 'html',
    convert: (markdown) => {
      const elements = markdownUtils.parse(markdown);
      const html = htmlUtils.convert(elements);
      return new Blob([html], { type: 'text/html' });
    },
  },
};

const generateFileName = (toolId, extension) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${toolId.toLowerCase()}-${timestamp}.${extension}`;
};

const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Exports content in different formats
 * @param {string} response - The content to export
 * @param {string} format - The format to export to ('pdf', 'plaintext', 'html')
 * @param {string} toolId - The ID of the tool
 * @returns {Promise<{ success: boolean, filename: string }>}
 * @throws {Error}
 */
export const exportContent = async (response, format, toolId) => {
  if (!format || !EXPORT_FORMATS[format]) {
    const supportedFormats = Object.keys(EXPORT_FORMATS).join(', ');
    throw new Error(
      `Unsupported export format: ${format}. Supported formats are: ${supportedFormats}`
    );
  }

  if (!response || !toolId) {
    throw new Error('Content and tool ID are required for export');
  }

  const formatConfig = EXPORT_FORMATS[format];
  const filename = generateFileName(toolId, formatConfig.extension);
  const blob = await formatConfig.convert(response);
  downloadFile(blob, filename);

  return { success: true, filename };
};
