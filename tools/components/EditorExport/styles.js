const styles = {
  outlinedButtonProps: {
    sx: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '10.3px',
      letterSpacing: '-0.02em',
      borderRadius: '8px',
      color: '#AC92FF',
      height: '36px',
      '& .MuiButton-root': {
        borderRadius: '8px',
        minWidth: 'auto',
      },
      '&:hover': {
        backgroundColor: '#AC92FF',
        '& .MuiSvgIcon-root': {
          color: '#FFFFFF',
        },
        color: '#FFFFFF',
        '& span': {
          color: '#FFFFFF',
        },
      },
    },
  },
  menuProps: {
    PaperProps: {
      sx: {
        backgroundColor: '#24272F',
        color: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #AC92FF',
        '& .MuiMenuItem-root': {
          '&:hover': {
            backgroundColor: 'rgba(172, 146, 255, 0.1)',
          },
        },
      },
    },
  },
  menuItemProps: {
    sx: {
      color: '#FFFFFF',
      fontSize: '14px',
      padding: '8px 16px',
    },
  },
  iconProps: {
    sx: {
      marginRight: 1,
      color: '#AC92FF',
      '&:hover': {
        color: '#FFFFFF',
      },
    },
  },
};

export default styles;
