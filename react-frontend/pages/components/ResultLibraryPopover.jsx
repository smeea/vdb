import React from 'react';
import { Popover } from 'react-bootstrap';

function ResultLibraryPopover(props) {
  const cardImage = (
    <img className='card-popover'
         src={'/images/cards/' + props.card['ASCII Name'].toLowerCase().replace(/[\s,:!?'".\-\(\)]/g, '') + '.jpg'}
         alt={props.card['Name']} />
  );

  const sets = Object.keys(props.card['Set']).map((k, index) => {
    return(
      <span className='ml-1' key={index}>
        {k}
      </span>
    );
  });

  const Type = (
    <img className='type-image-results'
         src={process.env.ROOT_URL + 'images/types/' + props.card['Type'].toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif'}
         alt={props.card['Type']}
    />
  );

  const Disciplines = (
    'TODO'
  );

  return (
    <Popover.Content>
      { props.showImage
        ? <>
            <div className='d-flex justify-content-between'>
              <b>{props.card['Name']}</b>
              {Type}
            </div>
            <hr />
            {props.card['Card Text']}
            <hr />
            <div className='d-flex justify-content-between popover-sets'>
              <div className='popover-sets'>
                {sets}
              </div>
              <div>
              </div>
            </div>
        </>
        : cardImage
      }
    </Popover.Content>
  );
}


export default ResultLibraryPopover;
