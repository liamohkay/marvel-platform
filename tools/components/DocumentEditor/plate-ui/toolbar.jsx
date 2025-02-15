import * as React from 'react';

import {
  FormatQuote as BlockQuoteIcon,
  FormatBold as BoldIcon,
  FormatListBulleted as BulletListIcon,
  FormatItalic as ItalicIcon,
  FormatListNumbered as NumberedListIcon,
  FormatUnderlined as UnderlineIcon,
  Undo as UndoIcon, 
  Redo as RedoIcon,
  FormatListBulleted as ListIcon,
  ArrowDropDown as DropdownArrowIcon,
  FormatAlignLeft as LeftAlignIcon,
  FormatAlignCenter as CenterAlignIcon,
  FormatAlignRight as RightAlignIcon,
  FormatAlignJustify as JustifyAlignIcon,
  // TextFields as FontIcon,
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
// import H1Icon from '@/assets/svg/H1Icon.svg';
import H1Icon from '../../../../assets/svg/header1.svg';
import H2Icon from '../../../../assets/svg/header2.svg';
import H3Icon from '../../../../assets/svg/header3.svg';
import ParagraphIcon from '../../../../assets/svg/paragraph.svg';
const { undo, redo } = toolActions;

import { toggleList } from '@udecode/plate-list';

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

const ToolbarButton = withTooltip(
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
  const [fontStyleAnchorEl, setFontStyleAnchorEl] = React.useState(null);
  const [fontSizeAnchorEl, setFontSizeAnchorEl] = React.useState(null);
  const openFontStyle = Boolean(fontStyleAnchorEl);
  const openFontSize = Boolean(fontSizeAnchorEl);

  // Font Style Handlers
  const handleFontStyleMenuOpen = (event) => {
    setFontStyleAnchorEl(event.currentTarget);
  };

  const handleFontStyleMenuClose = () => {
    setFontStyleAnchorEl(null);
  };

  const handleFontStyleSelect = (fontStyle) => {
    toggleBlock(fontStyle);
    handleFontStyleMenuClose();
  };

  // Font Size Handlers
  const handleFontSizeMenuOpen = (event) => {
    setFontSizeAnchorEl(event.currentTarget);
  };

  const handleFontSizeMenuClose = () => {
    setFontSizeAnchorEl(null);
  };

  const handleFontSizeSelect = (fontSize) => {
    toggleMark(fontSize);
    handleFontSizeMenuClose();
  };

  return (
    <Toolbar className="slate-toolbar">

      {/* Undo and Redo buttons */}
      <ToolbarButton
          tooltip="Undo"
          onClick={handleUndo}
          className="slate-btn"
        >
          <UndoIcon fontSize="small" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Redo"
          onClick={handleRedo}
          className="slate-btn"

        >
          <RedoIcon fontSize="small" />
        </ToolbarButton>
         
        <ToolbarSeparator />
      {/* <ToolbarSeparator /> */}
      {/* Paragraph/Block Type Selection - MOVED TO THE FRONT */}
      {/* <FormControl 
        variant="standard" 
        className="slate-dropdown"
        sx={{ 
          minWidth: 120, 
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            backgroundColor: 'transparent',
            '&:focus': {
              backgroundColor: 'rgba(55, 65, 81, 0.5)',
            }
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: 'rgba(255,255,255,0.3)',
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'white',
          }
        }}
      >
        <Select
          value={headingLevel}
          onChange={(e) => toggleBlock(e.target.value)}
          displayEmpty
          IconComponent={DropdownIcon}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <div className="flex items-center text-gray-300">
                  <HeadingIcon className="mr-2" />
                  Paragraph
                </div>
              );
            }
            return headingOptions.find(opt => opt.value === selected)?.label;
          }}
        >
          {headingOptions.map((option) => (
            <MenuItem 
              key={option.value} 
              value={option.value}
              sx={{
                '&:hover': {
                  backgroundColor: '#3E3A4B',
                },
                '&.Mui-selected': {
                  backgroundColor: '#0C0B17',
                }
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <div className="slate-btn-container">
          
        <div className="slate-toolbar-group flex items-center">
          <IconButton
            id="font-style-button"
            aria-controls={openFontStyle ? 'font-style-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openFontStyle ? 'true' : undefined}
            onClick={handleFontStyleMenuOpen}
            className="list-style-dropdown flex items-center"
          >
            <ParagraphIcon className="mr-1 list-style-dropdown" />
          </IconButton>
          <DropdownArrowIcon className='dropdown-arrow' />
          
          <Menu
            id="font-style-menu"
            anchorEl={fontStyleAnchorEl}
            open={openFontStyle}
            onClose={handleFontStyleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'font-style-button',
            }}
            PaperProps={{
              className: 'marvel-list-dropdown',
            }}
          >
            <Typography className='list-text'>Text</Typography>
            <MenuItem 
              onClick={() => handleFontStyleSelect('h1')}
              className={`list-option ${isBlockActive('h1') ? 'is-active' : ''}`}
            >
              <ListItemIcon>
                <H1Icon />
              </ListItemIcon>
              <ListItemText primary="H1 Header" />
            </MenuItem>
            <MenuItem 
              onClick={() => handleFontStyleSelect('h2')}
              className={`list-option ${isBlockActive('h2') ? 'is-active' : ''}`}
            >
              <ListItemIcon>
                <H2Icon />
              </ListItemIcon>
              <ListItemText primary="H2 Header" />
            </MenuItem>
            <MenuItem 
              onClick={() => handleFontStyleSelect('h3')}
              className={`list-option ${isBlockActive('h3') ? 'is-active' : ''}`}
            >
              <ListItemIcon>
                <H3Icon />
              </ListItemIcon>
              <ListItemText primary="H3 Header" />
            </MenuItem>
            <MenuItem 
              onClick={() => handleFontStyleSelect('paragraph')}
              className={`list-option ${isBlockActive('paragraph') ? 'is-active' : ''}`}
            >
              <ListItemIcon>
                <ParagraphIcon />
              </ListItemIcon>
              <ListItemText primary="Paragraph" />
            </MenuItem>
          </Menu>
        </div>
        <div className="slate-toolbar-group flex items-center">
          <IconButton
            id="font-size-button"
            aria-controls={openFontSize ? 'font-size-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openFontSize ? 'true' : undefined}
            onClick={handleFontSizeMenuOpen}
            className="list-style-dropdown flex items-center"
          >
            <Typography className="mr-1 list-style-dropdown">12</Typography>
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
            <Typography className='list-text'>Font Size</Typography>
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
        <div className="slate-toolbar-group">
          <ToolbarButton
            tooltip="Bold"
            isActive={isMarkActive('bold')}
            onClick={() => toggleMark('bold')}
            className={`slate-btn ${isMarkActive('bold') ? 'is-active' : ''}`}
          >
            <BoldIcon className="h-5 w-5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Italic"
            isActive={isMarkActive('italic')}
            onClick={() => toggleMark('italic')}
            className={`slate-btn ${isMarkActive('italic') ? 'is-active' : ''}`}
          >
            <ItalicIcon className="h-5 w-5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Underline"
            isActive={isMarkActive('underline')}
            onClick={() => toggleMark('underline')}
            className={`slate-btn ${isMarkActive('underline') ? 'is-active' : ''}`}
          >
            <UnderlineIcon className="h-5 w-5" />
          </ToolbarButton>
        </div>
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
         {/* <ToolbarButton
          tooltip="Block Quote"
          isActive={isBlockActive('blockquote')}
          onClick={() => toggleBlock('blockquote')}
          className={`slate-btn ${isBlockActive('blockquote') ? 'is-active' : ''}`}
        >
          <BlockQuoteIcon className="h-5 w-5" />
        </ToolbarButton> */}
        <ToolbarSeparator />
        {/* <ToolbarButton
          tooltip="Block Quote"
          isActive={isBlockActive('blockquote')}
          onClick={() => toggleBlock('blockquote')}
        >
          <BlockQuoteIcon className="h-5 w-5" />
        </ToolbarButton> */}
      </div>
    </Toolbar>
  );
};
