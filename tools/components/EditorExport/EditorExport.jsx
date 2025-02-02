import { useContext, useState } from 'react';

import { FileUpload } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import styles from './styles';

import ALERT_COLORS from '@/libs/constants/notification';
import { AuthContext } from '@/libs/providers/GlobalProvider';

import { exportContent } from '@/tools/libs/utils/exportUtils';

/**
 * EditorExport component provides export functionality for tool outputs
 * @param {Object} props - Component props
 * @param {string} props.toolId - The ID of the tool
 * @param {Object} props.content - The content to be exported
 */
const EditorExport = ({ toolId, content }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleOpenSnackBar } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = async (format) => {
    try {
      setIsExporting(true);
      await exportContent(content, format, toolId);
      handleOpenSnackBar(ALERT_COLORS.SUCCESS, 'Export completed successfully');
    } catch (error) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, error.message || 'Export failed');
    } finally {
      setIsExporting(false);
      handleClose();
    }
  };

  const menuOptions = [
    { label: 'PDF', value: 'pdf' },
    { label: 'Plain Text', value: 'plaintext' },
    { label: 'HTML', value: 'html' },
  ];

  return (
    <>
      <GradientOutlinedButton
        icon={<FileUpload {...styles.iconProps} />}
        iconPlacement="left"
        clickHandler={handleClick}
        text="Export"
        loading={isExporting}
        disabled={isExporting}
        {...styles.outlinedButtonProps}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        {...styles.menuProps}
      >
        {menuOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleExport(option.value)}
            disabled={isExporting}
            {...styles.menuItemProps}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default EditorExport;
