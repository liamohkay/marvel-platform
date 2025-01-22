import * as React from 'react';

import { cn } from '@udecode/cn';
import { SlateElement } from '@udecode/plate';
import { cva } from 'class-variance-authority';

const headingVariants = cva('relative mb-1', {
  variants: {
    variant: {
      h1: 'mt-[1.6em] pb-1 font-heading text-4xl font-bold',
      h2: 'mt-[1.4em] pb-px font-heading text-2xl font-semibold tracking-tight',
      h3: 'mt-[1em] pb-px font-heading text-xl font-semibold tracking-tight',
      h4: 'mt-[0.75em] font-heading text-lg font-semibold tracking-tight',
      h5: 'mt-[0.75em] text-lg font-semibold tracking-tight',
      h6: 'mt-[0.75em] text-base font-semibold tracking-tight',
    },
  },
});

export const HeadingElementStatic = ({
  children,
  className,
  variant = 'h1',
  ...props
}) => {
  return (
    (<SlateElement
      as={variant}
      className={cn(className, headingVariants({ variant }))}
      {...props}>
      {children}
    </SlateElement>)
  );
};
