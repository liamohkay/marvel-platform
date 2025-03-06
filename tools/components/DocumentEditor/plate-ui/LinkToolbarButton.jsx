'use client';

import React from 'react';

import { useLinkToolbarButton, useLinkToolbarButtonState } from '@udecode/plate-link/react';
import {
    Link as LinkIcon
  } from '@mui/icons-material';
  

import { ToolbarButton } from './toolbar';

 const LinkToolbarButton = (props) => {
  const state = useLinkToolbarButtonState();
  const { props: buttonProps } = useLinkToolbarButton(state);

  return (
    <ToolbarButton
      data-plate-focus
      tooltip="Link"
      {...buttonProps}
      {...props}
      className="slate-btn"
    >
      <LinkIcon />
    </ToolbarButton>
  );
};
export default LinkToolbarButton;