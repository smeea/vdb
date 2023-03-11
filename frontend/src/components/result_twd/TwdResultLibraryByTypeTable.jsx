import React, { useState } from 'react';
import {
  ResultLibraryTypeImage,
  DeckLibraryTable,
  ResultModal,
  Tooltip,
  Warning,
} from '@/components';
// import { useApp } from '@/context';
import { cardtypeSortedFull } from '@/utils/constants';
import { useDeckLibrary, useModalCardController } from '@/hooks';

const TwdResultLibraryByTypeTable = ({ library }) => {
  // TODO check if required
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

  const {
    libraryByType,
    hasBanned,
    trifleTotal,
    libraryTotal,
    libraryByTypeTotal,
  } = useDeckLibrary(library);

  const cards = [];
  cardtypeSortedFull
    .filter((cardtype) => libraryByType[cardtype] !== undefined)
    .map((cardtype) => {
      cards.push(...libraryByType[cardtype]);
    });

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
        Library [{libraryTotal}] {hasBanned && <Warning value="BANNED" />}
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
