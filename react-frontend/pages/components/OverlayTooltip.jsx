import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

function OverlayTooltip(props) {
  return (
    <OverlayTrigger
      placement={props.placement ? props.placement : 'right'}
      delay={{ show: 150, hide: 300 }}
      overlay={<Popover content>{props.text}</Popover>}
    >
      {props.children}
    </OverlayTrigger>
  );
}

export default OverlayTooltip;
