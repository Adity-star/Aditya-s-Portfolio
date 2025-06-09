import React from 'react';
import { Spinner } from 'react-bootstrap';

const styles = {
  spinnerContainerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  // You can add keyframes via a style tag or CSS file, but here we’ll add via <style> in JSX:
};

function FallbackSpinner({ size = 'lg', variant = 'primary' }) {
  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      <div
        style={styles.spinnerContainerStyle}
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        <Spinner animation="grow" size={size} variant={variant} />
      </div>
    </>
  );
}

export default FallbackSpinner;
