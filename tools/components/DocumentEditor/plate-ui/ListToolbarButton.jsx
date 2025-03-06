'use client';

import React from 'react';

import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import FormatListNumbered from '@mui/icons-material/FormatListNumbered';
import { withRef } from '@udecode/cn';

import { ToolbarButton } from './toolbar';

const ListToolbarButton = withRef(
  ({ nodeType, editor, isActive, onClick, ...rest }, ref) => {
    let Icon;
    let tooltip;

    if (nodeType === 'ul') {
      Icon = FormatListBulleted;
      tooltip = 'Bulleted List';
    } else if (nodeType === 'ol') {
      Icon = FormatListNumbered;
      tooltip = 'Numbered List';
    } else if (nodeType === 'action_item') {
      Icon = ChecklistIcon;
      tooltip = 'To-Do List';
    } else {
      return null;
    }

    // Filter out the pressed prop to avoid DOM warnings
    const filteredProps = { ...rest };
    if ('pressed' in filteredProps) {
      delete filteredProps.pressed;
    }

    return (
      <ToolbarButton
        className="slate-btn"
        ref={ref}
        tooltip={tooltip}
        isActive={!!isActive}
        onClick={onClick}
        {...filteredProps}
      >
        <Icon className="h-5 w-5" />
      </ToolbarButton>
    );
  }
);

ListToolbarButton.displayName = 'ListToolbarButton';

export default ListToolbarButton;
