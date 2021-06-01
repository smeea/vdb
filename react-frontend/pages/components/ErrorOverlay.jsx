import React from 'react';
import { Overlay } from 'react-bootstrap';

const ErrorOverlay = (props) => {
  const text = props.children;
  const modal = props.modal;
  const className = props.modal
    ? 'modal-tooltip error-tooltip'
    : 'error-tooltip';
  return (
    <Overlay
      show={props.show}
      target={props.target}
      placement={props.placement ? props.placement : 'left'}
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
