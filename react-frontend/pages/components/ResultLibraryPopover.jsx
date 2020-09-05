import React from 'react';
import { Popover } from 'react-bootstrap';

function ResultLibraryPopover(props) {
  const cardImage = (
    <img className='card-popover'
         src={'/images/cards/' + props.card['Name'].toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.jpg'}
         alt={props.card['Name']} />
  );

  return (
    <>
      <Popover.Content>
        { props.showImage ?
          props.card['Card Text']
          :
          cardImage
        }
      </Popover.Content>
    </>
  );
}


export default ResultLibraryPopover;
