import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

function OverlayTooltip(props) {
  const defaultDelay = { show: 0, hide: 0 };

  return (
    <OverlayTrigger
      placement={props.placement ? props.placement : 'right'}
      delay={props.delay ? props.delay : defaultDelay}
      show={props.show}
      overlay={<Popover content>{props.text}</Popover>}
    >
      {props.children}
    </OverlayTrigger>
  );
}

export default OverlayTooltip;
