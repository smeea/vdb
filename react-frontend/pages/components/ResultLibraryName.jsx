import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import ResultLibraryPopover from './ResultLibraryPopover.jsx';

function ResultLibraryName(props) {
  const CardPopover = React.forwardRef(({ children, ...props }, ref) => {
    return (
      <Popover ref={ref} {...props}>
        <ResultLibraryPopover card={props.card} showImage={children} />
      </Popover>
    );
  });
  CardPopover.displayName = 'CardPopover';

  return (
    <OverlayTrigger
      placement="right"
      overlay={<CardPopover card={props.card}>{props.showImage}</CardPopover>}
    >
      <span className="name" onClick={props.toggleImage}>
        {props.value} {props.ban && ' [BANNED]'}
      </span>
    </OverlayTrigger>
  );
}

export default ResultLibraryName;
