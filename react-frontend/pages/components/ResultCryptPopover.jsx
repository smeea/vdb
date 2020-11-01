import React from 'react';
import { Popover, ListGroup } from 'react-bootstrap';

import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';

function ResultCryptPopover(props) {
  const imgSrc = `${process.env.ROOT_URL}images/cards/${props.card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)]/g, '')}${props.card['Adv'] && 'adv'}.jpg`;
  const cardImage = (
    <img
      className={props.fullWidth ? "card-popover full-width" : "card-popover"}
      src={imgSrc}
      alt={props.card['Name']}
      onClick={props.handleClose}
    />
  );

  const Sets = Object.keys(props.card['Set']).map((k, index) => {
    return (
      <span key={index} className="d-inline-block nobr ml-2">
        {k}:{props.card['Set'][k]}
      </span>
    );
  });

  const Rulings = Object(props.card['Rulings']).map((k, index) => {
    return <ListGroup.Item key={index}>{k}</ListGroup.Item>;
  });

  return (
    <>
      {props.showImage ? (
        <>
          <div className="d-flex flex-nowrap justify-content-between align-items-center">
            <div className="d-flex flex-nowrap align-items-center">
              <div>
                <ResultCryptClan value={props.card['Clan']} />
              </div>
              <div className="pl-2">
                <b>{props.card['Name']}</b>
              </div>
            </div>
            <div className="pl-2">
              <ResultCryptGroup value={props.card['Group']} />
            </div>
          </div>
          <hr />
          {props.card['Card Text']}
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <ResultCryptDisciplines value={props.card['Disciplines']} />
            <div className="popover-sets px-1">{Sets}</div>
            <ResultCryptCapacity value={props.card['Capacity']} />
          </div>
          {Rulings.length > 0 && (
            <div className="popover-rulings pt-2">
              <ListGroup>{Rulings}</ListGroup>
            </div>
          )}
        </>
      ) : (
        cardImage
      )}
    </>
  );
}

export default ResultCryptPopover;
