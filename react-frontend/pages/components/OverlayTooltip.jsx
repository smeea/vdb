import React from 'react';
import { OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';

function OverlayTooltip(props) {
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 150, hide: 300 }}
      overlay={<Popover content>{props.text}</Popover>}
    >
      {props.children}
    </OverlayTrigger>
  );
}

export default OverlayTooltip;
