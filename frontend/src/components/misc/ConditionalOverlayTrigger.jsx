import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';

const ConditionalOverlayTrigger = ({
  children,
  placement,
  overlay,
  disabled,
  delay,
}) => {
  const defaultDelay = { show: 0, hide: 0 };
  const defaultPlacement = 'right';

  return (
    <>
      {!disabled ? (
        <OverlayTrigger
          placement={placement ? placement : defaultPlacement}
          delay={delay ? delay : defaultDelay}
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
