import React from 'react';
import { Popover } from 'react-bootstrap';

import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';

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

  return (
    <Popover.Content>
      { props.showImage
        ? <>
            <div className='d-flex flex-nowrap justify-content-between align-items-center'>
              <div className='d-flex flex-nowrap align-items-center'>
                <div>
                  <ResultLibraryType cardtype={props.card['Type']} />
                </div>
                <div className='pl-2'>
                  <b>{props.card['Name']}</b>
                </div>
              </div>
              <div className='pl-1'>
                <ResultLibraryDisciplines value={props.card['Discipline']} />
                <ResultLibraryClan value={props.card['Clan']} />
              </div>
              { props.card['Burn Option'] &&
                <div className='pl-1'>
                  <ResultLibraryBurn value={props.card['Burn Option']} />
                </div>
              }
              { props.card['Card Text'].includes('Trifle.') &&
                <div className='pl-1'>
                  <ResultLibraryTrifle value={props.card['Card Text']} />
                </div>
              }
            </div>
            <hr />
            {props.card['Card Text']}
            <hr />
            <div className='d-flex align-items-center justify-content-between'>
              <div>
                <ResultLibraryCost
                  valuePool={props.card['Pool Cost']}
                  valueBlood={props.card['Blood Cost']}
                />
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
