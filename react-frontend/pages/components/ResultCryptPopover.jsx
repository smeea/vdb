import React from 'react';
import { Popover } from 'react-bootstrap';

function ResultCryptPopover(props) {
  const cardImage = (
    <img className='card-popover'
         src={'/images/cards/' + props.card['ASCII Name'].toLowerCase().replace(/[\s,:!?'".\-\(\)]/g, '') + (props.card['Adv'] && 'adv') + '.jpg'}
         alt={props.card['Name']} />
  );

  const sets = Object.keys(props.card['Set']).map((k, index) => {
    return(
      <span className='ml-1' key={index}>
        {k}
      </span>
    );
  });

  const Clan = (
    <img className='clan-image-results'
         src={process.env.ROOT_URL + 'images/clans/' + props.card['Clan'].toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif'}
         alt={props.card['Clan']}
    />
  );

  const Capacity = (
    <img className='capacity-image-results'
         src={process.env.ROOT_URL + 'images/misc/cap' + props.card['Capacity'] + '.png'}
         alt={props.card['Capacity']}
    />
  );

  const Disciplines = (
    'TODO'
  );

  return (
    <Popover.Content>
      { props.showImage
        ? <>
            <div className='d-flex justify-content-between amiddle'>
              <div>
                {Clan}
                {' '}
                <b>
                  {props.card['Name']}
                </b>
              </div>
              <div>
                <b>
                  <font color='a0a0a0'>G</font>
                  {props.card['Group']}
                </b>
              </div>
            </div>
            <hr />
            {props.card['Card Text']}
            <hr />
            <div className='d-flex justify-content-between popover-sets'>
              <div>
                {sets}
              </div>
              {Capacity}
            </div>
          </>
        : cardImage
      }
    </Popover.Content>
  );
}


export default ResultCryptPopover;
