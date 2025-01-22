import React from 'react';

import { cn } from '@udecode/cn';
import { SlateLeaf } from '@udecode/plate';

export function CodeSyntaxLeafStatic({
  children,
  className,
  ...props
}) {
  const syntaxClassName = `prism-token token ${props.leaf.tokenType}`;

  return (
    (<SlateLeaf className={cn(className, syntaxClassName)} {...props}>
      {children}
    </SlateLeaf>)
  );
}
