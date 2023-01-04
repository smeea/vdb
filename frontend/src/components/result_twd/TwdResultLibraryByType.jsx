import React, { useState } from 'react';
import {
  ResultLibraryTypeImage,
  DeckLibraryTable,
  ResultModal,
  Tooltip,
} from 'components';
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

  const LibraryTypes = [];

  cardtypeSortedFull
    .filter((cardtype) => libraryByType[cardtype] !== undefined)
    .map((cardtype, idx) => {
      LibraryTypes.push(
        <tr
          key={cardtype}
          className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
            idx % 2
              ? 'bg-bgThird dark:bg-bgThirdDark'
              : 'bg-bgPrimary dark:bg-bgPrimaryDark'
          }`}
        >
          <td className="min-w-[30px] 2xl:min-w-[60px]">
            <div className="flex justify-center">
              <ResultLibraryTypeImage value={cardtype} />
            </div>
          </td>
          <td
            onMouseOver={() => handleHover(cardtype)}
            onClick={() => handleClick(cardtype)}
          >
            <Tooltip
              placement="right"
              show={show[cardtype]}
              noPadding
              overlay={
                <div className="p-1">
                  <DeckLibraryTable
                    deck={{}}
                    handleModalCardOpen={handleModalCardOpen}
                    cards={libraryByType[cardtype]}
                  />
                </div>
              }
            >
              <div className="text-fgName dark:text-fgNameDark">
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
      <div className="font-bold">
        Library [{libraryTotal}]{hasBanned && ' - WITH BANNED'}
      </div>
      <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
        <tbody>{LibraryTypes}</tbody>
      </table>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </>
  );
};

export default TwdResultLibraryByType;
