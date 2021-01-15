import React, { useState } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import InfoCircle from '../../assets/images/icons/info-circle.svg';
import ResultLibraryType from './ResultLibraryType.jsx';
import DeckLibraryTable from './DeckLibraryTable.jsx';

function TwdResultLibraryByType(props) {
  const cardtypeSorted = [
    'Master',
    'Conviction',
    'Power',
    'Action',
    'Action/Reaction',
    'Action/Combat',
    'Political Action',
    'Ally',
    'Equipment',
    'Retainer',
    'Action Modifier',
    'Action Modifier/Combat',
    'Action Modifier/Reaction',
    'Reaction',
    'Reaction/Action Modifier',
    'Reaction/Combat',
    'Combat',
    'Combat/Action Modifier',
    'Combat/Reaction',
    'Event',
  ];

  let libraryTotal = 0;
  let trifleTotal = 0;
  const libraryByType = {};
  const libraryByTypeTotal = {};

  Object.keys(props.library).map((card) => {
    libraryTotal += props.library[card].q;
    const cardtype = props.library[card].c['Type'];
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
      libraryByTypeTotal[cardtype] = 0;
    }
    libraryByType[cardtype].push(props.library[card]);
    libraryByTypeTotal[cardtype] += props.library[card].q;
    if (
      cardtype == 'Master' &&
      props.library[card].c['Card Text'].toLowerCase().includes('trifle')
    ) {
      trifleTotal += props.library[card].q;
    }
  });

  const LibraryTypes = [];
  let resultTrClass = 'library-result-even';

  for (const cardtype of cardtypeSorted) {
    if (libraryByType[cardtype] !== undefined) {
      const TypePopover = React.forwardRef(({ children, ...props }, ref) => {
        return (
          <Popover ref={ref} {...props}>
            <Popover.Content>
              <DeckLibraryTable cards={props.cards} />
            </Popover.Content>
          </Popover>
        );
      });
      TypePopover.displayName = 'TypePopover';

      if (resultTrClass == 'library-result-even') {
        resultTrClass = 'library-result-odd';
      } else {
        resultTrClass = 'library-result-even';
      }

      LibraryTypes.push(
        <tr key={cardtype} className={resultTrClass}>
          <td className="type">
            <OverlayTrigger
              placement="right"
              overlay={<TypePopover cards={libraryByType[cardtype]} />}
            >
              <div className="name">
                <ResultLibraryType
                  cardtype={cardtype}
                  total={libraryByTypeTotal[cardtype]}
                  trifleTotal={cardtype == 'Master' && trifleTotal}
                  isMobile={props.isMobile}
                  isAuthor={false}
                />
              </div>
            </OverlayTrigger>
          </td>
        </tr>
      );
    }
  }

  return (
    <>
      <div className="px-1">
        <b>Library [{libraryTotal}]:</b>
      </div>
       <table width="100%">
         <tbody>{LibraryTypes}</tbody>
       </table>
      }
    </>
  );
}

export default TwdResultLibraryByType;
