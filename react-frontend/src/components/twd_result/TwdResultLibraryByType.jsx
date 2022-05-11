import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { DeckLibraryTable } from 'components';
import { useApp } from 'context';
import { cardtypeSortedFull } from 'utils/constants';

function TwdResultLibraryByType(props) {
  const { nativeLibrary } = useApp();

  let hasBanned = false;
  let libraryTotal = 0;
  let trifleTotal = 0;
  const libraryByType = {};
  const libraryByTypeTotal = {};

  Object.keys(props.library).map((card) => {
    if (props.library[card].c['Banned']) {
      hasBanned = true;
    }
    libraryTotal += props.library[card].q;
    const cardtype = props.library[card].c.Type;
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

  for (const [idx, cardtype] of cardtypeSortedFull.entries()) {
    if (libraryByType[cardtype] !== undefined) {
      const TypePopover = React.forwardRef(({ children, ...props }, ref) => {
        return (
          <Popover ref={ref} {...props}>
            <Popover.Body className="p-1">
              <DeckLibraryTable deckid={true} cards={props.cards} />
            </Popover.Body>
          </Popover>
        );
      });
      TypePopover.displayName = 'TypePopover';

      const imgClass = 'type-image-results';
      const cardtypes = cardtype.split('/');
      const cardtypeImages = cardtypes.map((cardtype, index) => {
        const imgSrc = `${process.env.ROOT_URL}images/types/${cardtype
          .toLowerCase()
          .replace(/[\s,:!?'.\-]/g, '')}.svg`;
        const imgTitle = cardtype;
        return (
          <img key={index} className={imgClass} src={imgSrc} title={imgTitle} />
        );
      });

      LibraryTypes.push(
        <tr key={cardtype} className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          <td className="type">{cardtypeImages}</td>
          <td className="name">
            <OverlayTrigger
              placement="right"
              overlay={<TypePopover cards={libraryByType[cardtype]} />}
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
        <b>
          Library [{libraryTotal}]{hasBanned && ' - WITH BANNED'}
        </b>
      </div>
      <table className="twd-librarybytype-table">
        <tbody>{LibraryTypes}</tbody>
      </table>
    </>
  );
}

export default TwdResultLibraryByType;
