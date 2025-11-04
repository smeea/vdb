import {  useState } from "react";
import { twMerge } from "tailwind-merge";
import { DeckCryptHeader, DiffCryptTable, FlexGapped, ResultModal } from "@/components";
import { CAPACITY, CLAN, CRYPT, GROUP, NAME, QUANTITYx, SECT } from "@/constants";
import { useApp } from "@/context";
import { useDeckCrypt, useModalCardController } from "@/hooks";
import { getKeyDisciplines } from "@/utils";

const ReviewCrypt = ({ cardChange, deckFrom, cardsTo }) => {
  const { setShowFloatingButtons, cryptDeckSort, changeCryptDeckSort, isDesktop, isMobile } =
    useApp();
  const [showInfo, setShowInfo] = useState(false);

  const sortMethods = {
    [CAPACITY]: "C",
    [CLAN]: "CL",
    [GROUP]: "G",
    [NAME]: "N",
    [QUANTITYx]: "Q",
    [SECT]: "S",
  };

  const { crypt, cryptSide, sortedCards, sortedCardsSide, cryptTotal } = useDeckCrypt(
    deckFrom[CRYPT],
    cryptDeckSort,
    cardsTo,
  );

  const { disciplinesSet, keyDisciplines } = getKeyDisciplines(crypt);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  const handleClick =     (card) => {
      handleModalCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    }

  const handleClickSide =     (card) => {
      handleModalSideCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    }

  const handleClose = () => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  }

  return (
    <FlexGapped
      className={twMerge(
        "flex-col",
        !isMobile && "sticky top-10 bg-bgPrimary max-md:top-0 dark:bg-bgPrimaryDark",
      )}
    >
      <div>
        <DeckCryptHeader
          cardChange={cardChange}
          cards={crypt}
          deck={deckFrom}
          setShowInfo={setShowInfo}
          setSortMethod={changeCryptDeckSort}
          showInfo={showInfo}
          sortMethod={cryptDeckSort}
          sortMethods={sortMethods}
          forceIsEditable
        />
        <DiffCryptTable
          isEditable
          cardChange={cardChange}
          handleClick={handleClick}
          cards={sortedCards}
          cardsFrom={deckFrom[CRYPT]}
          cardsTo={cardsTo}
          showInfo={showInfo}
          cryptTotal={cryptTotal}
          disciplinesSet={disciplinesSet}
          keyDisciplines={keyDisciplines}
        />
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="opacity-60 dark:opacity-50">
          <div className="flex items-center justify-between font-bold">Side Crypt</div>
          <DiffCryptTable
            isEditable
            cardChange={cardChange}
            handleClick={handleClickSide}
            cards={sortedCardsSide}
            cardsFrom={deckFrom[CRYPT]}
            cardsTo={cardsTo}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
          />
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleClose}
        />
      )}
    </FlexGapped>
  );
};

export default ReviewCrypt;
