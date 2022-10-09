import React from 'react';
import { Overlay } from 'react-bootstrap';

const ErrorOverlay = ({ children, show, modal, target, placement }) => {
  const text = children;
  const className = modal ? 'modal-tooltip error-tooltip' : 'error-tooltip';

  return (
    <Overlay
      show={show}
      target={target}
      placement={placement ? placement : 'left'}
      transition={false}
    >
      {({ placement, arrowProps, show: _show, popper, ...props }) => {
        return (
          <div {...props} className={className}>
            <b>{text}</b>
          </div>
        );
      }}
    </Overlay>
  );
};

export default ErrorOverlay;
