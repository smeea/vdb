import React from 'react';
import { Popover } from 'react-bootstrap';

function ResultCryptPopover(props) {
  const cardImage = (
    <img className='card-popover'
         src={'/cards/' + props.card['Name'].toLowerCase().replace(/[\s,:!?'.\-]/g, '') + (props.card['Adv'] && 'adv') + '.jpg'}
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


export default ResultCryptPopover;
