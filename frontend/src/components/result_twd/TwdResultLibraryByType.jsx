import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { DeckLibraryTable, ResultModal } from 'components';
import { useApp } from 'context';
import { isTrifle } from 'utils';
import { cardtypeSortedFull } from 'utils/constants';
import { useModalCardController } from 'hooks';

const TwdResultLibraryByType = ({ library }) => {
  const { setShowFloatingButtons } = useApp();
  const [show, setShow] = useState({});

  const handleClick = (cardtype) => {
    setShow((prevState) => {
      if (prevState[cardtype]) {
        return {};
      } else {
        return { [cardtype]: true };
      }
    });
  };

  const handleHover = (cardtype) => {
    if (Object.keys(show).length && !show[cardtype]) {
      setShow({});
    }
  };

  let hasBanned = false;
  let libraryTotal = 0;
  let trifleTotal = 0;
  const libraryByType = {};
  const libraryByTypeTotal = {};

  Object.keys(library).map((card) => {
    if (library[card].c['Banned']) {
      hasBanned = true;
    }
    libraryTotal += library[card].q;
    const cardtype = library[card].c.Type;
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
      libraryByTypeTotal[cardtype] = 0;
    }
    libraryByType[cardtype].push(library[card]);
    libraryByTypeTotal[cardtype] += library[card].q;
    if (isTrifle(card)) {
      trifleTotal += library[card].q;
    }
  });

  const cards = [];
  cardtypeSortedFull
    .filter((cardtype) => libraryByType[cardtype] !== undefined)
    .map((cardtype) => {
      cards.push(...libraryByType[cardtype]);
    });

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(cards);

  const handleCloseModal = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  const LibraryTypes = [];

  cardtypeSortedFull
    .filter((cardtype) => libraryByType[cardtype] !== undefined)
    .map((cardtype, idx) => {
      const TypePopover = React.forwardRef(({ ...props }, ref) => {
        return (
          <Popover ref={ref} {...props}>
            <Popover.Body className="p-1">
              <DeckLibraryTable
                deck={{}}
                handleModalCardOpen={handleModalCardOpen}
                cards={props.cards}
              />
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
          .replace(/[\s,:!?'.-]/g, '')}.svg`;
        const imgTitle = cardtype;
        return (
          <img
            key={`${idx}-${index}`}
            className={imgClass}
            src={imgSrc}
            title={imgTitle}
          />
        );
      });

      LibraryTypes.push(
        <tr key={cardtype} className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          <td className="type">{cardtypeImages}</td>
          <td
            onMouseOver={() => handleHover(cardtype)}
            onClick={() => handleClick(cardtype)}
            className="name"
          >
            <OverlayTrigger
              placement="right"
              show={show[cardtype]}
              overlay={
                <TypePopover
                  className="light-border"
                  cards={libraryByType[cardtype]}
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
    });

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
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TwdResultLibraryByType;
