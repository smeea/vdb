import React, { useState } from 'react';
import { Overlay, OverlayTrigger, Popover, Button } from 'react-bootstrap';

function ResultLibraryName(props) {
  const [showImage, setShowImage] = useState(false);

  const toggleImage = () => {
    if (showImage) {
      setShowImage(false);
    } else {
      setShowImage(true);
    }
  };

  const cardTextPopover = (
    <Popover>
      <Popover.Content>
        {props.card['Card Text']}
      </Popover.Content>
    </Popover>
  );

  const cardImagePopover = (
    <Popover>
      <Popover.Content>
        IMAGE
      </Popover.Content>
    </Popover>
  );

  return (
    <td className='name'>
      <OverlayTrigger
        placement='right'
        overlay={showImage ? cardImagePopover : cardTextPopover}
      >
        <a href='#' onClick={toggleImage}>
          {props.value} {props.ban && ' [BANNED]'}
        </a>
      </OverlayTrigger>
    </td>
  );
}

export default ResultLibraryName;
