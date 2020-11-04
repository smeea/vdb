import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import ResultLibraryPopover from './ResultLibraryPopover.jsx';

function ResultLibraryName(props) {
  const [showModal, setShowModal] = useState(undefined);

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
            {props.value} {props.ban && ' [BANNED]'}
          </span>
        </OverlayTrigger>
      ) : (
        <>
          <span className="name" onClick={() => setShowModal(true)}>
            {props.value} {props.ban && ' [BANNED]'}
          </span>
          {showModal && (
            <ResultLibraryModal
              show={showModal}
              card={props.card}
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              handleClose={() => setShowModal(false)}
            />
          )}
        </>
      )}
    </>
  );
}

export default ResultLibraryName;
