import React, { useState } from 'react';
import { DeckLibraryTable, ResultModal, Tooltip } from 'components';
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

  Object.keys(library).map((cardid) => {
    if (library[cardid].c['Banned']) {
      hasBanned = true;
    }
    libraryTotal += library[cardid].q;
    const cardtype = library[cardid].c.Type;
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
      libraryByTypeTotal[cardtype] = 0;
    }
    libraryByType[cardtype].push(library[cardid]);
    libraryByTypeTotal[cardtype] += library[cardid].q;
    if (isTrifle(library[cardid].c)) {
      trifleTotal += library[cardid].q;
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
      const cardtypes = cardtype.split('/');
      const cardtypeImages = cardtypes.map((cardtype, index) => {
        const imgSrc = `${process.env.ROOT_URL}images/types/${cardtype
          .toLowerCase()
          .replace(/[\s,:!?'.-]/g, '')}.svg`;
        return (
          <img
            key={`${idx}-${index}`}
            className="type-image-results h-[25px] max-w-none"
            src={imgSrc}
            title={cardtype}
          />
        );
      });

      LibraryTypes.push(
        <tr key={cardtype} className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          <td className="type flex items-center justify-center">
            {cardtypeImages}
          </td>
          <td
            onMouseOver={() => handleHover(cardtype)}
            onClick={() => handleClick(cardtype)}
            className="name"
          >
            <Tooltip
              placement="right"
              show={show[cardtype]}
              overlay={
                <div>
                  <DeckLibraryTable
                    deck={{}}
                    handleModalCardOpen={handleModalCardOpen}
                    cards={libraryByType[cardtype]}
                  />
                </div>
              }
            >
              <div>
                {cardtype} [{libraryByTypeTotal[cardtype]}]
                {cardtype == 'Master' && trifleTotal > 0 && (
                  <> - {trifleTotal} trifle</>
                )}
              </div>
            </Tooltip>
          </td>
        </tr>
      );
    });

  return (
    <>
      <div>
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
