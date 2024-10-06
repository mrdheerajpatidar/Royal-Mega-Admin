import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Loader = ({ isLoading }) => (
  <>
    <Backdrop
      sx={{
        '&.MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          zIndex: '9999999 !important',
        },
      }}
      open={isLoading}
    >
      <CircularProgress
        size={50}
        sx={{
          color: '#fff',
          top: -6,
          left: -6,
        }}
      />
    </Backdrop>
  </>
);

Loader.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value boolean.
   * @default false
   */
  isLoading: PropTypes.bool,
};

export default Loader;
