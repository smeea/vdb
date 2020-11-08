import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';

function ResultLibraryPopover(props) {
  const imgSrc = `${process.env.ROOT_URL}images/cards/${props.card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)]/g, '')}.jpg`;
  const cardImage = (
    <img
      className={props.fullWidth ? 'card-popover full-width' : 'card-popover'}
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
      {!props.showImage ? (
        <>
          <div className="d-flex flex-nowrap justify-content-between align-items-center">
            <div className="d-flex flex-nowrap align-items-center">
              <div>
                <ResultLibraryType cardtype={props.card['Type']} />
              </div>
              <div className="pl-2">
                <b>{props.card['Name']}</b>
              </div>
            </div>
            <div className="pl-1">
              <ResultLibraryDisciplines value={props.card['Discipline']} />
              <ResultLibraryClan value={props.card['Clan']} />
            </div>
            {props.card['Burn Option'] && (
              <div className="pl-1">
                <ResultLibraryBurn value={props.card['Burn Option']} />
              </div>
            )}
            {props.card['Card Text'].includes('Trifle.') && (
              <div className="pl-1">
                <ResultLibraryTrifle value={props.card['Card Text']} />
              </div>
            )}
          </div>
          <hr />
          {props.card['Card Text']}
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <ResultLibraryCost
              valuePool={props.card['Pool Cost']}
              valueBlood={props.card['Blood Cost']}
            />
            <div className="popover-sets px-1">{Sets}</div>
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

export default ResultLibraryPopover;
