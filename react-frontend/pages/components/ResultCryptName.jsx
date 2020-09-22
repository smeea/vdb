import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import ResultCryptPopover from './ResultCryptPopover.jsx';

function ResultCryptName(props) {
  const CardPopover = React.forwardRef(
    ({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <ResultCryptPopover card={props.card} showImage={children}/>
        </Popover>
      );
    },
  );

  const imgClass='advanced-image-results';
  let imgSrc='';
  let imgTitle='';
  if (props.adv) {
    imgSrc=process.env.ROOT_URL + 'images/misc/advanced.gif';
    imgTitle='Advanced'
  }

  return (
    <span className='name'>
      <OverlayTrigger
        placement='right'
        overlay={<CardPopover card={props.card}>{props.showImage}</CardPopover>}
      >
        <span className='d-flex flex-unwrap align-items-center card-name' onClick={props.toggleImage}>
          {props.value}
          { props.adv &&
            <span className='pl-1'>
              <img className={imgClass} src={imgSrc} title={imgTitle} />
            </span>
          }
          { props.ban && ' [BANNED]' }
        </span>
      </OverlayTrigger>
    </span>
  );
}

export default ResultCryptName;
