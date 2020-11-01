import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ResultCryptModal from './ResultCryptModal.jsx';
import ResultCryptPopover from './ResultCryptPopover.jsx';

function ResultCryptName(props) {
  const [showModal, setShowModal] = useState(undefined);

  const CardPopover = React.forwardRef(({ children, ...props }, ref) => {
    return (
      <Popover ref={ref} {...props}>
        <Popover.Content>
          <ResultCryptPopover card={props.card} showImage={children} />
        </Popover.Content>
      </Popover>
    );
  });
  CardPopover.displayName = 'CardPopover';

  const imgClass = 'advanced-image-results';
  let imgSrc = '';
  let imgTitle = '';
  if (props.adv) {
    imgSrc = `${process.env.ROOT_URL}images/misc/advanced.gif`;
    imgTitle = 'Advanced';
  }

  return (
    <>
      {!props.isMobile ? (
        <OverlayTrigger
          placement="right"
          overlay={
            <CardPopover card={props.card}>{props.showImage}</CardPopover>
          }
        >
          <span className="name" onClick={props.toggleImage}>
            {props.value}
            {props.adv && (
              <span className="pl-1">
                <img className={imgClass} src={imgSrc} title={imgTitle} />
              </span>
            )}
            {props.ban && ' [BANNED]'}
          </span>
        </OverlayTrigger>
      ) : (
        <>
          <span className="name" onClick={() => setShowModal(true)}>
            {props.value}
            {props.adv && (
              <span className="pl-1">
                <img className={imgClass} src={imgSrc} title={imgTitle} />
              </span>
            )}
            {props.ban && ' [BANNED]'}
          </span>
          {showModal && (
            <ResultCryptModal
              show={showModal}
              card={props.card}
              showImage={props.showImage}
              handleClose={() => setShowModal(false)}
            />
          )}
        </>
      )}
    </>
  );
}

export default ResultCryptName;
