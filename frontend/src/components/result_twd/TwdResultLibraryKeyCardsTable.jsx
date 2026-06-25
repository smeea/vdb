import ChevronBarContract from "@icons/chevron-bar-contract.svg?react";
import ChevronBarExpand from "@icons/chevron-bar-expand.svg?react";
import { useState } from "react";
import {
  Button,
  DeckLibrary,
  ResultLegalIcon,
  ResultLibraryCost,
  ResultModal,
  Toggle,
  TwdResultLibraryKeyCardsTableRow,
} from "@/components";
import { ASCII, BANNED, BLOOD, GROUPED_TYPE, ID, LIBRARY, POOL, X } from "@/constants";
import { useApp } from "@/context";
import { useDeckLibrary, useModalCardController } from "@/hooks";
import { librarySort } from "@/utils";

const TwdResultLibraryKeyCardsTable = ({ library, withHeader }) => {
  const { isMobile, isDesktop, setShowFloatingButtons } = useApp();
  const [showFullLibrary, setShowFullLibrary] = useState();
  const sortedLibrary = librarySort(Object.values(library), GROUPED_TYPE);
  const keyCards = sortedLibrary
    .filter((card) => card.q >= 4)
    .toSorted((a, b) => a.c[ASCII] - b.c[ASCII]);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(keyCards);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    !isDesktop && setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  };

  const { libraryTotal, hasBanned, poolTotal, bloodTotal } = useDeckLibrary(library);

  return (
    <div>
      <div className="h-[30px] px-1 font-bold">
        {withHeader ? (
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex basis-full items-center justify-between gap-1.5text-fgSecondary dark:text-whiteDark">
              <div className="whitespace-nowrap">
                {isMobile ? "Lib" : "Library"} [{libraryTotal}]
              </div>
              {hasBanned && <ResultLegalIcon type={BANNED} />}
              <div className="flex gap-1.5 sm:gap-3">
                <div className="flex items-center gap-1" title="Total Blood Cost">
                  <ResultLibraryCost card={{ [BLOOD]: X }} className="h-[30px] pb-1" />
                  <div>{bloodTotal}</div>
                </div>
                <div className="flex items-center gap-1" title="Total Pool Cost">
                  <ResultLibraryCost card={{ [POOL]: X }} className="h-[30px]" />
                  <div>{poolTotal}</div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowFullLibrary(!showFullLibrary)}
              title="Copy URL"
              className="p-1"
              noPadding
            >
              {showFullLibrary ? (
                <ChevronBarContract width="17" height="17" viewBox="0 0 16 16" />
              ) : (
                <ChevronBarExpand width="17" height="17" viewBox="0 0 16 16" />
              )}
            </Button>
          </div>
        ) : (
          <Toggle
            offValue="Key Cards"
            isOn={showFullLibrary}
            handleClick={() => setShowFullLibrary(!showFullLibrary)}
          >
            Full Library
          </Toggle>
        )}
      </div>
      {showFullLibrary ? (
        <DeckLibrary deck={{ [LIBRARY]: library }} handleClick={handleClick} inTwd />
      ) : (
        <table className="border-bgSecondary border-x dark:border-bgSecondaryDark">
          <tbody>
            {keyCards.map((card) => (
              <TwdResultLibraryKeyCardsTableRow
                key={card.c[ID]}
                card={card}
                handleClick={handleClick}
                shouldShowModal={shouldShowModal}
              />
            ))}
          </tbody>
        </table>
      )}
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

export default TwdResultLibraryKeyCardsTable;
