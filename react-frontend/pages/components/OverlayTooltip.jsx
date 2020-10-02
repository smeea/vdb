import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function OverlayTooltip(props) {
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 150, hide: 300 }}
      overlay={<Tooltip id="name-tooltip">{props.text}</Tooltip>}
    >
      {props.children}
    </OverlayTrigger>
  );
}

export default OverlayTooltip;
