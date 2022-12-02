import React from 'react';
import { Overlay } from 'react-bootstrap';

const ErrorOverlay = ({ children, show, target, placement }) => {
  const text = children;

  return (
    <Overlay
      show={show}
      target={target}
      placement={placement ? placement : 'left'}
      transition={false}
    >
      {({ placement, arrowProps, show: _show, popper, ...props }) => {
        return (
          <div
            {...props}
            className="error-tooltip text-xs rounded-md px-2 py-1 z-index[1100]"
          >
            <b>{text}</b>
          </div>
        );
      }}
    </Overlay>
  );
};

export default ErrorOverlay;
