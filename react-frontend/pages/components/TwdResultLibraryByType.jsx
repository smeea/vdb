import React, { useContext } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import DeckLibraryTable from './DeckLibraryTable.jsx';
import AppContext from '../../context/AppContext.js';

function TwdResultLibraryByType(props) {
  const { nativeLibrary } = useContext(AppContext);

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
      nativeLibrary[card]['Card Text'].toLowerCase().includes('trifle')
    ) {
      trifleTotal += props.library[card].q;
    }
  });

  const LibraryTypes = [];
  let resultTrClass = 'result-even';

  for (const cardtype of cardtypeSorted) {
    if (libraryByType[cardtype] !== undefined) {
      const TypePopover = React.forwardRef(({ children, ...props }, ref) => {
        return (
          <Popover ref={ref} {...props}>
            <Popover.Content>
              <DeckLibraryTable
                deckid={true}
                cards={props.cards}
                inventoryMode={props.inventoryMode}
                inventoryLibrary={props.inventoryLibrary}
                usedCards={props.usedLibraryCards}
                decks={props.decks}
              />
            </Popover.Content>
          </Popover>
        );
      });
      TypePopover.displayName = 'TypePopover';

      if (resultTrClass == 'result-even') {
        resultTrClass = 'result-odd';
      } else {
        resultTrClass = 'result-even';
      }

      const imgClass = 'type-image-results';
      const cardtypes = cardtype.split('/');
      const cardtypeImages = cardtypes.map((cardtype, index) => {
        const imgSrc = `${
          process.env.ROOT_URL
        }images/types/${cardtype
          .toLowerCase()
          .replace(/[\s,:!?'.\-]/g, '')}.svg`;
        const imgTitle = cardtype;
        return (
          <img key={index} className={imgClass} src={imgSrc} title={imgTitle} />
        );
      });

      LibraryTypes.push(
        <tr key={cardtype} className={resultTrClass}>
          <td className="type">{cardtypeImages}</td>
          <td className="name">
            <OverlayTrigger
              placement="right"
              overlay={
                <TypePopover
                  cards={libraryByType[cardtype]}
                  inventoryMode={props.inventoryMode}
                  inventoryLibrary={props.inventoryLibrary}
                  usedCards={props.usedLibraryCards}
                  decks={props.decks}
                />
              }
            >
              <div>
                {cardtype} [{libraryByTypeTotal[cardtype]}]
                {cardtype == 'Master' && trifleTotal > 0 && (
                  <> - {trifleTotal} trifle</>
                )}
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
      <table className="twd-librarybytype-table">
        <tbody>{LibraryTypes}</tbody>
      </table>
    </>
  );
}

export default TwdResultLibraryByType;
