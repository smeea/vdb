import React from 'react';
import { Popover } from 'react-bootstrap';

function ResultLibraryPopover(props) {
  const cardImage = (
    <img className='card-popover'
         src={'/images/cards/' + props.card['ASCII Name'].toLowerCase().replace(/[\s,:!?'".\-\(\)]/g, '') + '.jpg'}
         alt={props.card['Name']} />
  );

  const Sets = Object.keys(props.card['Set']).map((k, index) => {
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
    'DISCIPLIES TODO'
  );

  const Cost = (
    'COST TODO'
  );

  return (
    <Popover.Content>
      { props.showImage
        ? <>
            <div className='d-flex flex-nowrap justify-content-between align-items-center'>
              <div className='d-flex flex-nowrap align-items-center'>
                <div>
                  {Type}
                </div>
                <div className='pl-1'>
                  <b>{props.card['Name']}</b>
                </div>
              </div>
              <div className='pl-1'>
                {Disciplines}
              </div>
            </div>
            <hr />
            {props.card['Card Text']}
            <hr />
            <div className='d-flex justify-content-between'>
              <div>
                {Cost}
              </div>
              <div className='popover-sets'>
                {Sets}
              </div>
            </div>
          </>
        : cardImage
      }
    </Popover.Content>
  );
}


export default ResultLibraryPopover;
