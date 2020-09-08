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

  return (
    <span className='name'>
      <OverlayTrigger
        placement='right'
        overlay={<CardPopover card={props.card}>{props.showImage}</CardPopover>}
      >
        <span className='card-name' onClick={props.toggleImage}>
          {props.value} {props.adv && ' [ADV]'} {props.ban && ' [BANNED]'}
        </span>
      </OverlayTrigger>
    </span>
  );
}

export default ResultCryptName;
