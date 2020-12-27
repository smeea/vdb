import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ResultLibraryType from './ResultLibraryType.jsx';
import DeckLibraryTable from './DeckLibraryTable.jsx';

function TwdResultLibraryByType({ library, isMobile }) {
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

  Object.keys(library).map((card) => {
    libraryTotal += library[card].q;
    const cardtype = library[card].c['Type'];
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
      libraryByTypeTotal[cardtype] = 0;
    }
    libraryByType[cardtype].push(library[card]);
    libraryByTypeTotal[cardtype] += library[card].q;
    if (cardtype == 'Master' && library[card].c['Card Text'].toLowerCase().includes('trifle')) {
      trifleTotal += library[card].q;
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
                  isMobile={isMobile}
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
      <div>
        <b>Library [{libraryTotal}]:</b>
      </div>
      <table width="100%">
        <tbody>{LibraryTypes}</tbody>
      </table>
    </>
  );
}

export default TwdResultLibraryByType;
