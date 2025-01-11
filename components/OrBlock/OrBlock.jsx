import { Grid } from '@mui/material';

import { styled } from '@mui/system';

/*
 * This component renders a horizontally centered "Or" block with lines on both sides.
 * It's styled using Material-UI's styling solution and designed to be used as a divider or separator.
 *
 * @componenta
 * @returns {JSX.Element} A centered "Or" divider with lines on both sides.
 */
const OrBlock = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <LineWrapper>
        <Line />
        <Text>Or</Text>
        <Line />
      </LineWrapper>
    </Grid>
  );
};

const LineWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  justifyContent: 'center',
});

const Line = styled('div')({
  flexGrow: 1,
  height: '1px',
  backgroundColor: '#464953',
});

const Text = styled('span')({
  padding: '0 10px',
  fontSize: '18px',
});

export default OrBlock;
