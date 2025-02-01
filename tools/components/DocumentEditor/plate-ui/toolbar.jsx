import * as React from 'react';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn, withRef, withVariants } from '@udecode/cn';
import { cva } from 'class-variance-authority';

import { 
  FormatBold as BoldIcon, 
  FormatItalic as ItalicIcon, 
  FormatUnderlined as UnderlineIcon, 
  LooksOne as H1Icon, 
  LooksTwo as H2Icon, 
  Looks3 as H3Icon, 
  LooksFour as H4Icon,
  LooksFive as H5Icon,
  LooksSix as H6Icon,
  FormatListBulleted as BulletListIcon, 
  FormatListNumbered as NumberedListIcon, 
  FormatQuote as BlockQuoteIcon 
} from '@mui/icons-material';

import { 
  FormatSize as HeadingIcon,
  ArrowDropDown as DropdownIcon 
} from '@mui/icons-material';
import { 
  Select, 
  MenuItem, 
  FormControl 
} from '@mui/material';

import { Separator } from './separator';
import { withTooltip } from './tooltip';

// Toolbar styling consistent with Marvel's platform dark mode
const toolbarButtonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-white/80 hover:bg-gray-700 hover:text-white transition-colors',
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

const dropdownArrowVariants = cva(
  cn(
    'inline-flex items-center justify-center rounded-r-md text-sm font-medium text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
  {
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-9 w-6',
        sm: 'h-8 w-5',
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

// Toolbar Button Component with Tooltip
const ToolbarButton = withTooltip(
  React.forwardRef((props, ref) => {
    const { 
      children, 
      className, 
      tooltip, 
      isActive, 
      size = 'sm', 
      onClick, 
      ...restProps 
    } = props;

    return (
      <ToolbarPrimitive.Button
        ref={ref}
        className={cn(
          toolbarButtonVariants({
            size,
            variant: isActive ? 'active' : 'default',
          }),
          className
        )}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </ToolbarPrimitive.Button>
    );
  })
);

// Toolbar for Plate.js Editor
export const EditorToolbar = ({ editor }) => {
  const [headingLevel, setHeadingLevel] = React.useState('');

  // Check if a mark is active
  const isMarkActive = (format) => {
    if (!editor) return false;
    
    // Manually check for active marks using Plate.js editor methods
    const { selection } = editor;
    if (!selection) return false;

    const [match] = editor.nodes({
      match: (node) => node[format] === true,
      at: selection,
    });

    return !!match;
  };

  // Check if a block is active
  const isBlockActive = (type) => {
    if (!editor) return false;
    
    const { selection } = editor;
    if (!selection) return false;

    // Safely check for node type
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

  // Toggle mark (bold, italic, underline)
  const toggleMark = (format) => {
    if (!editor) return;
    
    // Check if the mark is currently active
    const isActive = isMarkActive(format);
    
    // If active, remove the mark; if not active, add the mark
    if (isActive) {
      editor.removeMark(format);
    } else {
      editor.addMark(format, true);
    }
  };

  // Toggle block type (headings, lists, block quotes)
  const toggleBlock = (type) => {
    if (!editor) {
      console.warn('Toolbar: Editor not ready');
      return;
    }
    
    // Existing logic with added safety checks
    try {
      switch (type) {
        case 'blockquote':
          editor.toggleNodeType('blockquote');
          break;
        case 'ul':
          editor.toggleList('unordered');
          break;
        case 'ol':
          editor.toggleList('ordered');
          break;
        default:
          if (!type) {
            editor.setNodes({ type: 'paragraph' });
            setHeadingLevel('');
            return;
          }
          
          const isCurrentType = isBlockActive(type);
          
          if (isCurrentType) {
            editor.setNodes({ type: 'paragraph' });
            setHeadingLevel('');
          } else {
            editor.setNodes({ type: type });
            setHeadingLevel(type);
          }
      }
    } catch (error) {
      console.warn(`Toolbar: Error toggling ${type}:`, error);
    }
  };

  const headingOptions = [
    { value: 'paragraph', label: 'Paragraph' },
    { value: 'h1', label: 'Heading 1' },
    { value: 'h2', label: 'Heading 2' },
    { value: 'h3', label: 'Heading 3' },
    { value: 'h4', label: 'Heading 4' },
    { value: 'h5', label: 'Heading 5' },
    { value: 'h6', label: 'Heading 6' }
  ];

  return (
    <Toolbar className="slate-toolbar">
      <div className="slate-btn-container">
        {/* Paragraph/Block Type Selection - MOVED TO THE FRONT */}
        <FormControl 
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
        </FormControl>

        <div className="slate-separator"></div>

        {/* Text Formatting Group */}
        <div className="slate-toolbar-group">
          <ToolbarButton
            tooltip="Bold"
            isActive={isMarkActive('bold')}
            onClick={() => toggleMark('bold')}
            className={`slate-btn ${isMarkActive('bold') ? 'is-active' : ''}`}
          >
            <BoldIcon className="h-5 w-5" />
            {isMarkActive('bold') && (
              <span className="slate-btn-indicator"></span>
            )}
          </ToolbarButton>

          <ToolbarButton
            tooltip="Italic"
            isActive={isMarkActive('italic')}
            onClick={() => toggleMark('italic')}
            className={`slate-btn ${isMarkActive('italic') ? 'is-active' : ''}`}
          >
            <ItalicIcon className="h-5 w-5" />
            {isMarkActive('italic') && (
              <span className="slate-btn-indicator"></span>
            )}
          </ToolbarButton>

          <ToolbarButton
            tooltip="Underline"
            isActive={isMarkActive('underline')}
            onClick={() => toggleMark('underline')}
            className={`slate-btn ${isMarkActive('underline') ? 'is-active' : ''}`}
          >
            <UnderlineIcon className="h-5 w-5" />
            {isMarkActive('underline') && (
              <span className="slate-btn-indicator"></span>
            )}
          </ToolbarButton>
        </div>

        <div className="slate-separator"></div>

        {/* List Buttons */}
        <div className="slate-toolbar-group">
          <ToolbarButton
            tooltip="Bullet List"
            isActive={isBlockActive('bulletList')}
            onClick={() => toggleBlock('bulletList')}
            className={`slate-btn ${isBlockActive('bulletList') ? 'is-active' : ''}`}
          >
            <BulletListIcon className="h-5 w-5" />
            {isBlockActive('bulletList') && (
              <span className="slate-btn-indicator"></span>
            )}
          </ToolbarButton>

          <ToolbarButton
            tooltip="Numbered List"
            isActive={isBlockActive('numberedList')}
            onClick={() => toggleBlock('numberedList')}
            className={`slate-btn ${isBlockActive('numberedList') ? 'is-active' : ''}`}
          >
            <NumberedListIcon className="h-5 w-5" />
            {isBlockActive('numberedList') && (
              <span className="slate-btn-indicator"></span>
            )}
          </ToolbarButton>
        </div>

        <div className="slate-separator"></div>

        {/* Block Quote Button */}
        <ToolbarButton
          tooltip="Block Quote"
          isActive={isBlockActive('blockquote')}
          onClick={() => toggleBlock('blockquote')}
          className={`slate-btn ${isBlockActive('blockquote') ? 'is-active' : ''}`}
        >
          <BlockQuoteIcon className="h-5 w-5" />
          {isBlockActive('blockquote') && (
            <span className="slate-btn-indicator"></span>
          )}
        </ToolbarButton>
      </div>
    </Toolbar>
  );
};

export const ToolbarToggleGroup = withCn(
  ToolbarPrimitive.ToolbarToggleGroup,
  'flex items-center'
);

export const ToolbarLink = withCn(
  ToolbarPrimitive.Link,
  'font-medium underline underline-offset-4'
);

export const ToolbarSeparator = withCn(
  ToolbarPrimitive.Separator,
  'mx-2 my-1 w-px shrink-0 bg-border'
);

export const ToolbarToggleItem = withVariants(
  ToolbarPrimitive.ToggleItem,
  toolbarButtonVariants,
  ['variant', 'size']
);

export const ToolbarGroup = withRef((props, ref) => {
  const { children, className } = props;
  return (
    <div
      ref={ref}
      className={cn(
        'group/toolbar-group',
        'relative hidden has-[button]:flex',
        className
      )}
    >
      <div className="flex items-center">{children}</div>

      <div className="mx-1.5 py-0.5 group-last/toolbar-group:!hidden">
        <Separator orientation="vertical" />
      </div>
    </div>
  );
});

export const ToolbarSplitButton = React.forwardRef((props, ref) => {
  const { children, className, ...restProps } = props;
  return (
    <ToolbarButton
      ref={ref}
      className={cn('group flex gap-0 px-0 hover:bg-transparent', className)}
      {...restProps}
    >
      {children}
    </ToolbarButton>
  );
});

export const ToolbarSplitButtonPrimary = withTooltip(
  React.forwardRef((props, ref) => {
    const { children, className, size, variant, ...restProps } = props;
    return (
      <span
        ref={ref}
        className={cn(
          toolbarButtonVariants({
            size,
            variant,
          }),
          'rounded-r-none',
          'group-data-[pressed=true]:bg-accent group-data-[pressed=true]:text-accent-foreground',
          className
        )}
        {...restProps}
      >
        {children}
      </span>
    );
  })
);

export const ToolbarSplitButtonSecondary = React.forwardRef((props, ref) => {
  const { className, size, variant, ...restProps } = props;
  return (
    <span
      ref={ref}
      className={cn(
        dropdownArrowVariants({
          size,
          variant,
        }),
        'group-data-[pressed=true]:bg-accent group-data-[pressed=true]:text-accent-foreground',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      role="button"
      {...restProps}
    >
      <ChevronDown className="size-3.5 text-muted-foreground" data-icon />
    </span>
  );
});

ToolbarSplitButtonSecondary.displayName = 'ToolbarSplitButtonSecondary';

export { ToolbarButton };
