import {
  DeckCryptHeader,
  DiffCardsTotalDiff,
  DiffCryptTable,
  FlexGapped,
  ResultModal,
} from "@/components";
import { CAPACITY, CLAN, CRYPT, DECKID, GROUP, NAME, QUANTITYx, SECT } from "@/constants";
import { useApp } from "@/context";
import { useDeckCrypt, useModalCardController } from "@/hooks";
import { getIsEditable, getKeyDisciplines } from "@/utils";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const DiffCrypt = ({ cardsTo, deck }) => {
  const { isMobile, cryptDeckSort, changeCryptDeckSort, setShowFloatingButtons } = useApp();
  const [showInfo, setShowInfo] = useState(false);
  const cardsFrom = deck[CRYPT];
  const isEditable = getIsEditable(deck);

  const sortMethods = {
    [CAPACITY]: "C",
    [CLAN]: "CL",
    [GROUP]: "G",
    [NAME]: "N",
    [QUANTITYx]: "Q",
    [SECT]: "S",
  };

  const { crypt, cryptSide, sortedCards, sortedCardsSide, cryptTotal, cryptToTotal } = useDeckCrypt(
    cardsFrom,
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

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClickSide = (card) => {
    handleModalSideCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  return (
    <FlexGapped
      className={twMerge(
        "flex-col",
        !isMobile && "sticky top-10 bg-bgPrimary max-md:top-0 dark:bg-bgPrimaryDark",
      )}
    >
      <div>
        <DeckCryptHeader
          cryptTotalDiff={<DiffCardsTotalDiff qTo={cryptToTotal} qFrom={cryptTotal} />}
          cards={crypt}
          deck={deck}
          setShowInfo={setShowInfo}
          setSortMethod={changeCryptDeckSort}
          showInfo={showInfo}
          sortMethod={cryptDeckSort}
          sortMethods={sortMethods}
        />
        <DiffCryptTable
          handleClick={handleClick}
          deckid={deck[DECKID]}
          cards={sortedCards}
          cardsFrom={cardsFrom}
          cardsTo={cardsTo}
          cryptTotal={cryptTotal}
          showInfo={showInfo}
          isEditable={isEditable}
          disciplinesSet={disciplinesSet}
          keyDisciplines={keyDisciplines}
        />
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="opacity-60 dark:opacity-50">
          <div className="flex items-center justify-between font-bold">Side Crypt</div>
          <DiffCryptTable
            handleClick={handleClickSide}
            deckid={deck[DECKID]}
            cards={sortedCardsSide}
            cardsFrom={cardsFrom}
            cardsTo={cardsTo}
            isEditable={isEditable}
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

export default DiffCrypt;
