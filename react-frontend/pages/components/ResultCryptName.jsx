import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ResultCryptPopover from './ResultCryptPopover.jsx';

function ResultCryptName(props) {
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
    imgSrc = `${process.env.ROOT_URL}images/misc/advanced.svg`;
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
          <div
            className="namee"
            onClick={() => props.setShowImage(!props.showImage)}
          >
            {props.card['Name']}
            {props.card['Adv'] && (
              <span className="pl-1">
                <img className={imgClass} src={imgSrc} title={imgTitle} />
              </span>
            )}
            {props.ban && ' [BANNED]'}
          </div>
        </OverlayTrigger>
      ) : (
        <>
          <span className="name">
            {props.card['Name']}
            {props.card['Adv'] && (
              <span className="pl-1">
                <img className={imgClass} src={imgSrc} title={imgTitle} />
              </span>
            )}
            {props.ban && ' [BANNED]'}
          </span>
        </>
      )}
    </>
  );
}

export default ResultCryptName;
