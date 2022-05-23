import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const OverlayTooltip = (children, placement, text, show, className, delay) => {
  const defaultDelay = { show: 0, hide: 0 };
  const defaultPlacement = 'right';

  return (
    <OverlayTrigger
      placement={placement ? placement : defaultPlacement}
      delay={delay ? delay : defaultDelay}
      show={show}
      overlay={
        <Popover className={className}>
          <div className="p-2">{text}</div>
        </Popover>
      }
    >
      {children}
    </OverlayTrigger>
  );
};

export default OverlayTooltip;
