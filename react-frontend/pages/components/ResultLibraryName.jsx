import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

function ResultLibraryName(props) {
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
          {props.value} {props.ban && ' [BANNED]'}
        </a>
      </OverlayTrigger>
    </td>
  );
}

export default ResultLibraryName;
