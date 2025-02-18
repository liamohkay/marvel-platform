import React from 'react';
import { PlateEditor } from './editor/PlateEditor';
const DocumentEditor = (props) => {
  // const { markdownContent } = props;
  const markdownContent = `
# Markdown syntax guide
## Headers
# This is a Heading h1
## This is a Heading h2
### This is a Heading h3
#### This is a Heading h4
##### This is a Heading h5
###### This is a Heading h6
## Lists
### Unordered
* Item 1
* Item 2
* Item 2a
* Item 2b
### Ordered
1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b
## Blockquotes
> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
## Inline code
This is \`inline code\`
## Code blocks
\`\`\`
let message = 'Hello world';
alert(message);
\`\`\`
## Links
You may be using [Markdown Live Preview](https://markdownlivepreview.com/).
## Emphasis
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__
_You **can** combine them_
## Images
![This is an alt text.](https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "This is a sample image.")
## Tables
| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |
## Blocks of code
\`\`\`javascript
let message = 'Hello world';
alert(message);
\`\`\`
## Inline code
This web site is using \`plate\`.
## GitHub Flavored Markdown
### Task Lists
- [x] Completed task
- [ ] Incomplete task
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [ ] list syntax required (any unordered or ordered list supported)
### Strikethrough
~~This text is strikethrough~~
### Autolinks
Visit https://github.com automatically converts to a link
Email example@example.com also converts automatically
### Emoji
:smile: :heart:
`;
  return (
    <div className="document-editor h-full w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <div className="bg-gray-800 p-4 rounded-md shadow-md min-h-[400px] border border-gray-700">
        <PlateEditor markdownContent={markdownContent} />
      </div>
    </div>
  );
};
export default DocumentEditor;