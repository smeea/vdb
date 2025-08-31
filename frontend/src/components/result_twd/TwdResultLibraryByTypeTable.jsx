import cardtypeSortedFull from "@/assets/data/cardtypeSortedFull.json";
import {
  ConditionalTooltip,
  DeckLibraryTable,
  ResultLegalIcon,
  ResultLibraryCost,
  ResultLibraryTypeImage,
  ResultModal,
  Tr,
} from "@/components";
import { BANNED, BLOOD, POOL, TYPE_MASTER, X } from "@/constants";
import { useApp } from "@/context";
import { useDeckLibrary, useModalCardController } from "@/hooks";

const TwdResultLibraryByTypeTable = ({ library }) => {
  const { limitedMode, setShowFloatingButtons, isDesktop } = useApp();

  const handleClickCard = (card) => {
    handleModalCardOpen(card);
    !isDesktop && setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  };

  const {
    libraryByType,
    hasBanned,
    hasLimited,
    trifleTotal,
    libraryTotal,
    libraryByTypeTotal,
    poolTotal,
    bloodTotal,
  } = useDeckLibrary(library);

  const cards = cardtypeSortedFull
    .filter((cardtype) => libraryByType[cardtype] !== undefined)
    .map((cardtype) => libraryByType[cardtype]);

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
        <div className="flex gap-2">
          {hasBanned && <ResultLegalIcon type={BANNED} />}
          {limitedMode && hasLimited && (
            <div
              className="flex gap-0.5 font-normal text-fgRed dark:text-fgRedDark"
              title="Restricted Cards"
            >
              <ResultLegalIcon />
              {Math.round((hasLimited / libraryTotal) * 100)}%
            </div>
          )}
        </div>
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
      <table className="border-bgSecondary border-x dark:border-bgSecondaryDark">
        <tbody>
          {cardtypeSortedFull
            .filter((cardtype) => libraryByType[cardtype] !== undefined)
            .map((cardtype) => {
              return (
                <Tr key={cardtype}>
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
                        {cardtype === TYPE_MASTER && trifleTotal > 0 && (
                          <> - {trifleTotal} trifle</>
                        )}
                      </div>
                    </ConditionalTooltip>
                  </td>
                </Tr>
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
