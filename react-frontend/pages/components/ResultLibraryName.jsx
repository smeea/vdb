import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ResultLibraryPopover from './ResultLibraryPopover.jsx';

function ResultLibraryName(props) {
  const CardPopover = React.forwardRef(({ children, ...props }, ref) => {
    return (
      <Popover ref={ref} {...props}>
        <Popover.Content>
          <ResultLibraryPopover card={props.card} showImage={children} />
        </Popover.Content>
      </Popover>
    );
  });
  CardPopover.displayName = 'CardPopover';

  return (
    <>
      {!props.isMobile ? (
        <OverlayTrigger
          placement="right"
          overlay={
            <CardPopover card={props.card}>{props.showImage}</CardPopover>
          }
        >
          <span className="name" onClick={() => props.setShowImage(!props.showImage)}>
            {props.card['Name']} {props.card['Banned'] && ' [BANNED]'}
          </span>
        </OverlayTrigger>
      ) : (
        <>
          <span className="name">
            {props.card['Name']} {props.card['Banned'] && ' [BANNED]'}
          </span>
        </>
      )}
    </>
  );
}

export default ResultLibraryName;
