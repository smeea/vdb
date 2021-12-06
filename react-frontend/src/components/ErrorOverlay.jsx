import React from 'react';
import { Overlay } from 'react-bootstrap';

const ErrorOverlay = React.forwardRef((props, ref) => {
  const text = props.children;
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
      {({ placement, ref, arrowProps, show: _show, popper, ...props }) => {
        return (
          <div ref={ref} {...props} className={className}>
            <b>{text}</b>
          </div>
        );
      }}
    </Overlay>
  );
});
ErrorOverlay.displayName = 'ErrorOverlay';

export default ErrorOverlay;
