import React, { useState } from 'react';
import {
  ResultLibraryTypeImage,
  DeckLibraryTable,
  ResultModal,
  Tooltip,
  Banned,
} from '@/components';
// import { useApp } from '@/context';
import { isTrifle } from '@/utils';
import { cardtypeSortedFull } from '@/utils/constants';
import { useModalCardController } from '@/hooks';

const TwdResultLibraryByTypeTable = ({ library }) => {
  // const { setShowFloatingButtons } = useApp();
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

  return (
    <div>
      <div className="font-bold">
        Library [{libraryTotal}] {hasBanned && <Banned />}
      </div>
      <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
        <tbody>
          {cardtypeSortedFull
            .filter((cardtype) => libraryByType[cardtype] !== undefined)
            .map((cardtype, idx) => {
              return (
                <tr
                  key={cardtype}
                  className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
                    idx % 2
                      ? 'bg-bgThird dark:bg-bgThirdDark'
                      : 'bg-bgPrimary dark:bg-bgPrimaryDark'
                  }`}
                >
                  <td className="min-w-[55px]">
                    <div className="flex justify-center">
                      <ResultLibraryTypeImage value={cardtype} />
                    </div>
                  </td>
                  <td
                    onMouseOver={() => handleHover(cardtype)}
                    onClick={() => handleClick(cardtype)}
                    className="w-full"
                  >
                    <Tooltip
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
            })}
        </tbody>
      </table>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </div>
  );
};

export default TwdResultLibraryByTypeTable;
