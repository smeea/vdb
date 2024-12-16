import React from 'react';
import {
  ResultLibraryTypeImage,
  DeckLibraryTable,
  ResultModal,
  ConditionalTooltip,
  ResultLegalIcon,
  ResultLibraryCost,
} from '@/components';
import { useApp } from '@/context';
import cardtypeSortedFull from '@/assets/data/cardtypeSortedFull.json';
import { X, TYPE_MASTER, POOL, BLOOD, BANNED } from '@/constants';
import { useDeckLibrary, useModalCardController } from '@/hooks';

const TwdResultLibraryByTypeTable = ({ library }) => {
  const { setShowFloatingButtons } = useApp();

  const handleClickCard = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  const {
    libraryByType,
    hasBanned,
    trifleTotal,
    libraryTotal,
    libraryByTypeTotal,
    poolTotal,
    bloodTotal,
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
      <div className="flex h-[30px] items-center justify-between gap-2 px-1 font-bold text-fgSecondary dark:text-whiteDark">
        <div className="flex items-center gap-1.5 whitespace-nowrap">Library [{libraryTotal}]</div>
        <div className="flex">{hasBanned && <ResultLegalIcon type={BANNED} />}</div>
        <div className="flex gap-1.5 sm:gap-3">
          <div className="flex items-center gap-1" title="Total Blood Cost">
            <ResultLibraryCost card={{ [BLOOD]: X }} className="h-[30px] pb-1" />
            <b>{bloodTotal}</b>
          </div>
          <div className="flex items-center gap-1" title="Total Pool Cost">
            <ResultLibraryCost card={{ [POOL]: X }} className="h-[30px]" />
            <b>{poolTotal}</b>
          </div>
        </div>
      </div>
      <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
        <tbody>
          {cardtypeSortedFull
            .filter((cardtype) => libraryByType[cardtype] !== undefined)
            .map((cardtype) => {
              return (
                <tr
                  key={cardtype}
                  className="row-bg h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark"
                >
                  <td className="min-w-[55px]">
                    <div className="flex justify-center">
                      <ResultLibraryTypeImage value={cardtype} />
                    </div>
                  </td>
                  <td className="w-full">
                    <ConditionalTooltip
                      noPadding
                      overlay={
                        <div className="p-1">
                          <DeckLibraryTable
                            deck={{}}
                            handleClick={handleClickCard}
                            cards={libraryByType[cardtype]}
                          />
                        </div>
                      }
                    >
                      <div className="cursor-pointer text-balance text-fgName dark:text-fgNameDark">
                        {cardtype} [{libraryByTypeTotal[cardtype]}]
                        {cardtype == TYPE_MASTER && trifleTotal > 0 && <> - {trifleTotal} trifle</>}
                      </div>
                    </ConditionalTooltip>
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
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default TwdResultLibraryByTypeTable;
