import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

function ResultCryptName(props) {
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
        <img className='card-popover' src={'/cards/' + props.card['Name'].toLowerCase().replace(/[\s,:!?'.\-]/g, '') + (props.card['Adv'] && 'adv') + '.jpg'} alt={props.card['Name']} />
      </Popover.Content>
    </Popover>
  );

  return (
    <td className='name'>
      <OverlayTrigger
        placement='right'
        overlay={showImage ? cardImagePopover : cardTextPopover}
      >
        <span className='card-name' onClick={toggleImage}>
          {props.value} {props.adv && ' [ADV]'} {props.ban && ' [BANNED]'}
        </span>
      </OverlayTrigger>
    </td>
  );
}

export default ResultCryptName;
