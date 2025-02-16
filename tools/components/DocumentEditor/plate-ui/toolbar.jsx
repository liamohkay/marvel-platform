import * as React from 'react';

import {
  FormatListBulleted as BulletListIcon,
  FormatListNumbered as NumberedListIcon,
  FormatListBulleted as ListIcon,
  ArrowDropDown as DropdownArrowIcon,
  FormatAlignLeft as LeftAlignIcon,
  FormatAlignCenter as CenterAlignIcon,
  FormatAlignRight as RightAlignIcon,
  FormatAlignJustify as JustifyAlignIcon,
} from '@mui/icons-material';

import { 
  Menu, 
  MenuItem, 
  IconButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn } from '@udecode/cn';
import { cva } from 'class-variance-authority';

import { useDispatch } from 'react-redux';

import ToolbarSeparator from './ToolbarSeparator';
import { withTooltip } from './tooltip';

import { actions as toolActions } from '@/tools/data';
import FontStyle from './FontStyle';

import  UndoRedo  from './UndoRedo';
import TextStyle from './TextStyle';

const { undo, redo } = toolActions;

const toolbarButtonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-white/80 hover:bg-gray-700 hover:text-white transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
  {
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2',
      },
      variant: {
        default: 'bg-transparent',
        active: 'bg-gray-700 text-white',
      },
    },
  }
);

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
  'flex items-center bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg'
);

export const ToolbarButton = withTooltip(
  React.forwardRef(
    (
      { children, className, tooltip, isActive, onClick, ...restProps },
      ref
    ) => (
      <ToolbarPrimitive.Button
        ref={ref}
        className={cn(
          toolbarButtonVariants({ variant: isActive ? 'active' : 'default' }),
          className
        )}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </ToolbarPrimitive.Button>
    )
  )
);

export const EditorToolbar = (props) => {
  const { editor } = props;
  if (!editor) return null;


  const dispatch = useDispatch();
  const handleUndo = () => dispatch(undo());
  const handleRedo = () => dispatch(redo());

  const isMarkActive = (format) => {
    const { selection } = editor;
    if (!selection) return false;
    const [match] = editor.nodes({
      match: (node) => node[format] === true,
      at: selection,
    });
    return !!match;
  };

  const isBlockActive = (type) => {
    const { selection } = editor;
    if (!selection) return false;
    try {
      const [match] = editor.nodes({
        match: (node) => node.type === type,
        at: selection,
      });
      return !!match;
    } catch {
      return false;
    }
  };

  const toggleMark = (format) => {
    isMarkActive(format)
      ? editor.removeMark(format)
      : editor.addMark(format, true);
  };

  const toggleBlock = (type) => {
    try {
      editor.setNodes({ type: isBlockActive(type) ? 'paragraph' : type });
    } catch (error) {
      console.warn(`Toolbar: Error toggling ${type}:`, error);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleListMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleListMenuClose = () => {
    setAnchorEl(null);
  };

  const handleListStyleSelect = (blockType) => {
    toggleBlock(blockType);
    handleListMenuClose();
  };

  const [alignmentAnchorEl, setAlignmentAnchorEl] = React.useState(null);
  const openAlignment = Boolean(alignmentAnchorEl);

  const handleAlignmentMenuOpen = (event) => {
    setAlignmentAnchorEl(event.currentTarget);
  };

  const handleAlignmentMenuClose = () => {
    setAlignmentAnchorEl(null);
  };

  const handleAlignmentSelect = (alignmentType) => {
    toggleBlock(alignmentType);
    handleAlignmentMenuClose();
  };

  // Font Style and Size State Management
 
  const [fontSizeAnchorEl, setFontSizeAnchorEl] = React.useState(null);
 
  const openFontSize = Boolean(fontSizeAnchorEl);


  // Font Size Handlers
  const handleFontSizeMenuOpen = (event) => {
    setFontSizeAnchorEl(event.currentTarget);
  };

  const handleFontSizeMenuClose = () => {
    setFontSizeAnchorEl(null);
  };

  const handleFontSizeSelect = (fontSize) => {
    // Remove existing font size marks
    const fontSizes = ['fontSize8', 'fontSize10', 'fontSize12', 'fontSize14', 'fontSize16'];
    fontSizes.forEach(size => {
      if (isMarkActive(size)) {
        editor.removeMark(size);
      }
    });

    // Add new font size mark
    editor.addMark(fontSize, true);
    handleFontSizeMenuClose();
  };

  const getCurrentFontSize = () => {
    const fontSizes = ['fontSize8', 'fontSize10', 'fontSize12', 'fontSize14', 'fontSize16'];
    const activeFontSize = fontSizes.find(size => isMarkActive(size));
    return activeFontSize ? activeFontSize.replace('fontSize', '') + ' pt' : '14 pt';
  };

  return (
    <Toolbar className="slate-toolbar">

      {/* Undo and Redo buttons */}

<UndoRedo handleUndo={handleUndo} handleRedo={handleRedo} />

        <ToolbarSeparator />
      <div className="slate-btn-container">

        <FontStyle editor={editor} isBlockActive={isBlockActive} toggleBlock={toggleBlock}/>
        <div className="slate-toolbar-group flex items-center">
          <IconButton
            id="font-size-button"
            aria-controls={openFontSize ? 'font-size-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openFontSize ? 'true' : undefined}
            onClick={handleFontSizeMenuOpen}
            className="list-style-dropdown flex items-center"
          >
            <Typography className="mr-1 list-style-dropdown">
              {getCurrentFontSize()}
            </Typography>
          </IconButton>
          <DropdownArrowIcon className='dropdown-arrow' />
          
          <Menu
            id="font-size-menu"
            anchorEl={fontSizeAnchorEl}
            open={openFontSize}
            onClose={handleFontSizeMenuClose}
            MenuListProps={{
              'aria-labelledby': 'font-size-button',
            }}
            PaperProps={{
              className: 'marvel-list-dropdown',
            }}
          >
            <Typography className='list-text-font'>Font Size</Typography>
            {[8, 10, 12, 14, 16].map((size) => (
              <MenuItem 
                key={size}
                onClick={() => handleFontSizeSelect(`fontSize${size}`)}
                className={`list-option ${isMarkActive(`fontSize${size}`) ? 'is-active' : ''}`}
              >
                <ListItemText primary={`${size} pt`} style={{fontSize: `${size}px`}} />
              </MenuItem>
            ))}
          </Menu>
        </div>
        <ToolbarSeparator />
<TextStyle editor={editor} isMarkActive={isMarkActive} toggleMark={toggleMark} />

        <ToolbarSeparator />
        <div className="slate-toolbar-group">
          <IconButton
            id="list-style-button"
            aria-controls={open ? 'list-style-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleListMenuOpen}
            className="list-style-dropdown flex items-center"
          >
            <ListIcon className="mr-1 list-style-dropdown" />
           
          </IconButton>
          <DropdownArrowIcon className='dropdown-arrow' />
          <Menu
            id="list-style-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleListMenuClose}
            MenuListProps={{
              'aria-labelledby': 'list-style-button',
            }}
            PaperProps={{
              className: 'marvel-list-dropdown',
            }}
          >
            <Typography className='list-text'>List</Typography>
            <MenuItem 
              onClick={() => handleListStyleSelect('bulletList')}
              className={`list-option ${isBlockActive('bulletList') ? 'is-active' : ''}`}
            >
              
              <ListItemIcon>
                <BulletListIcon />
              </ListItemIcon>
              <ListItemText primary="Bullet List" />
            </MenuItem>
            <MenuItem 
              onClick={() => handleListStyleSelect('numberedList')}
              className={`list-option ${isBlockActive('numberedList') ? 'is-active' : ''}`}
            >
              <ListItemIcon>
                <NumberedListIcon />
              </ListItemIcon>
              <ListItemText primary="Number List" />
            </MenuItem>
          </Menu>
        </div>
        <div className="slate-toolbar-group flex items-center">
          <IconButton
            id="alignment-style-button"
            aria-controls={openAlignment ? 'alignment-style-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openAlignment ? 'true' : undefined}
            onClick={handleAlignmentMenuOpen}
            className="list-style-dropdown flex items-center"
          >
            <LeftAlignIcon className="mr-1 list-style-dropdown" />
          </IconButton>
          <DropdownArrowIcon className='dropdown-arrow' />
          <Menu
            id="alignment-style-menu"
            anchorEl={alignmentAnchorEl}
            open={openAlignment}
            onClose={handleAlignmentMenuClose}
            MenuListProps={{
              'aria-labelledby': 'alignment-style-button',
            }}
            PaperProps={{
              className: 'marvel-list-dropdown',
            }}
          >
            <Typography className='list-text'>Alignment</Typography>
            <MenuItem 
              onClick={() => handleAlignmentSelect('leftAlign')}
              className={`list-option ${isBlockActive('leftAlign') ? 'is-active' : ''}`}
            >
              <ListItemIcon>
                <LeftAlignIcon />
              </ListItemIcon>
              <ListItemText primary="Left Align" />
            </MenuItem>
            <MenuItem 
              onClick={() => handleAlignmentSelect('centerAlign')}
              className={`list-option ${isBlockActive('centerAlign') ? 'is-active' : ''}`}
            >
              <ListItemIcon>
                <CenterAlignIcon />
              </ListItemIcon>
              <ListItemText primary="Center Align" />
            </MenuItem>
            <MenuItem 
              onClick={() => handleAlignmentSelect('rightAlign')}
              className={`list-option ${isBlockActive('rightAlign') ? 'is-active' : ''}`}
            >
              <ListItemIcon>
                <RightAlignIcon />
              </ListItemIcon>
              <ListItemText primary="Right Align" />
            </MenuItem>
            <MenuItem 
              onClick={() => handleAlignmentSelect('justifyAlign')}
              className={`list-option ${isBlockActive('justifyAlign') ? 'is-active' : ''}`}
            >
              <ListItemIcon>
                <JustifyAlignIcon />
              </ListItemIcon>
              <ListItemText primary="Justify Align" />
            </MenuItem>
          </Menu>
        </div>
        
        <ToolbarSeparator />
      </div>
    </Toolbar>
  );
};
