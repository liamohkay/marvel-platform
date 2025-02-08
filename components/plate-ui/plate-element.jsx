'use client';;
import React from 'react';

import { PlateElement as PlateElementPrimitive } from '@udecode/plate/react';

import { BlockSelection } from './block-selection';

export const PlateElement = React.forwardRef(({
  children,
  ...props
}, ref) => {
  return (
    (<PlateElementPrimitive ref={ref} {...props}>
      {children}
      {props.className?.includes('slate-selectable') && <BlockSelection />}
    </PlateElementPrimitive>)
  );
});
