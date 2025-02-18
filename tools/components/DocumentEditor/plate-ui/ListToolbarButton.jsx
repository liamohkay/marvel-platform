'use client';

import React from 'react';

import { withRef } from '@udecode/cn';
import {
  BulletedListPlugin,
  useListToolbarButton,
  useListToolbarButtonState,
  ELEMENT_UL,
  ELEMENT_OL
} from '@udecode/plate-list/react';
import { 
  FormatListBulleted as BulletListIcon, 
  FormatListNumbered as NumberedListIcon 
} from '@mui/icons-material';
import { ToolbarButton } from './toolbar';

 const ListToolbarButton = withRef(
  ({ nodeType, editor, isActive, onClick, ...rest }, ref) => {
    
    const state = useListToolbarButtonState({ nodeType });
    const { props } = useListToolbarButton(state);
    return (
      <ToolbarButton
        className="slate-btn"
        ref={ref}
        tooltip={
          nodeType === ELEMENT_UL ? 'Bulleted List' : 'Numbered List'
        }
        isActive={isActive}
       onClick={onClick}
        {...props}
        {...rest}
      >
        {nodeType === ELEMENT_UL ? <BulletListIcon /> : <NumberedListIcon />}
      </ToolbarButton>
    );
  }
);
export default ListToolbarButton;