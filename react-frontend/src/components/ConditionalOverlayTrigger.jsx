import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';

const ConditionalOverlayTrigger = ({
  children,
  placement,
  overlay,
  disabled,
}) => {
  return (
    <>
      {!disabled ? (
        <OverlayTrigger
          placement={placement ? placement : 'right'}
          overlay={overlay}
        >
          {children}
        </OverlayTrigger>
      ) : (
        children
      )}
    </>
  );
};

export default ConditionalOverlayTrigger;
