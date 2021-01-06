import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Hammer from '../../assets/images/icons/hammer.svg';
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
  if (props.card['Adv']) {
    imgSrc = `${process.env.ROOT_URL}images/misc/advanced.svg`;
    imgTitle = 'Advanced';
  }

  return (
    <>
      {!props.isMobile ? (
        <OverlayTrigger
          placement={props.placement ? props.placement : 'right'}
          overlay={
            <CardPopover card={props.card}>{props.showImage}</CardPopover>
          }
        >
          <div
            className="name"
            onClick={() => props.setShowImage(!props.showImage)}
          >
            {props.card['Banned'] ? (
              <>
                <strike>{props.card['Name']}</strike>
                {props.card['Adv'] && (
                  <span className="pl-1">
                    <img className={imgClass} src={imgSrc} title={imgTitle} />
                  </span>
                )}
                <span className="pl-1">
                  <Hammer />
                </span>
              </>
            ) : (
              <>
                {props.card['Name']}
                {props.card['Adv'] && (
                  <span className="pl-1">
                    <img className={imgClass} src={imgSrc} title={imgTitle} />
                  </span>
                )}
              </>
            )}
          </div>
        </OverlayTrigger>
      ) : (
        <>
          <div className="name">
            {props.card['Banned'] ? (
              <>
                <strike>{props.card['Name']}</strike>
                {props.card['Adv'] && (
                  <span className="pl-1">
                    <img className={imgClass} src={imgSrc} title={imgTitle} />
                  </span>
                )}
                <span className="pl-1">
                  <Hammer />
                </span>
              </>
            ) : (
              <>
                {props.card['Name']}
                {props.card['Adv'] && (
                  <span className="pl-1">
                    <img className={imgClass} src={imgSrc} title={imgTitle} />
                  </span>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ResultCryptName;
