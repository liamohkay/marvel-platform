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
      height: '32px',
      '& .MuiButton-root': {
        borderRadius: '8px',
        minWidth: 'auto',
      },
      '& svg': {
        marginRight: 1,
        '& path': {
          stroke: '#AC92FF',
        },
      },
      '&:hover': {
        backgroundColor: '#0C0B17',
        color: '#AC92FF',
        '& svg path': {
          stroke: '#AC92FF',
        },
      },
    },
  },
  menuProps: {
    PaperProps: {
      sx: {
        backgroundColor: '#0C0B17',
        color: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.3)',
        '& .MuiMenuItem-root': {
          '&:hover': {
            backgroundColor: '#3E3A4B',
          },
          '&.Mui-selected': {
            backgroundColor: '#0C0B17',
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
      '&:hover': {
        backgroundColor: '#3E3A4B',
      },
    },
  },
};

export default styles;
