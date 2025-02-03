import { useContext, useState } from 'react';

import { Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import FileExportIcon from '@/assets/svg/FileExport.svg';

import styles from './styles';

import ALERT_COLORS from '@/libs/constants/notification';
import { AuthContext } from '@/libs/providers/GlobalProvider';

import { exportContent } from '@/tools/libs/utils/exportUtils';

/**
 * EditorExport component provides export functionality for tool outputs
 */
const EditorExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleOpenSnackBar } = useContext(AuthContext);

  const { content } = useSelector(
    (state) => state.tools.editorState.currentState
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = async (format) => {
    try {
      setIsExporting(true);
      await exportContent(content, format);
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
        icon={<FileExportIcon />}
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
