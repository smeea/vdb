import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

function ResultCryptName(props) {
  const cardPopover = (
    <Popover>
      <Popover.Content>
        {props.card['Card Text']}
      </Popover.Content>
    </Popover>
  );

  return (
    <td className='name'>
      <OverlayTrigger
        placement="right"
        overlay={cardPopover}
      >
        <a href='#'>
          {props.value} {props.adv && ' [ADV]'} {props.ban && ' [BANNED]'}
        </a>
      </OverlayTrigger>
    </td>
  );
}

export default ResultCryptName;
