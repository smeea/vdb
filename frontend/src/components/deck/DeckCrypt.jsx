import { useCallback, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { DeckCryptHeader, DeckCryptTable, FlexGapped, ResultModal } from '@/components';
import { CAPACITY, CLAN, CRYPT, GROUP, NAME, QUANTITYx, SECT } from '@/constants';
import { useApp } from '@/context';
import { useDeckCrypt, useModalCardController } from '@/hooks';
import { getKeyDisciplines } from '@/utils';

const DeckCrypt = ({ inSearch, inPreview, inMissing, noDisciplines, deck }) => {
  const { setShowFloatingButtons, cryptDeckSort, changeCryptDeckSort, isDesktop, isMobile } =
    useApp();
  const [showInfo, setShowInfo] = useState(false);

  const sortMethods = {
    [CAPACITY]: 'C',
    [CLAN]: 'CL',
    [GROUP]: 'G',
    [NAME]: 'N',
    [QUANTITYx]: 'Q',
    [SECT]: 'S',
  };

  const { crypt, cryptSide, sortedCards, sortedCardsSide, cryptTotal } = useDeckCrypt(
    deck[CRYPT],
    cryptDeckSort,
  );

  const { disciplinesSet, keyDisciplines } = useMemo(() => {
    return getKeyDisciplines(deck[CRYPT]);
  }, [deck[CRYPT]]);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  const handleClick = useCallback(
    (card) => {
      handleModalCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    },
    [sortedCards, sortedCardsSide],
  );

  const handleClickSide = useCallback(
    (card) => {
      handleModalSideCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    },
    [sortedCards, sortedCardsSide],
  );

  const handleClose = useCallback(() => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  }, [sortedCards, sortedCardsSide]);

  return (
    <FlexGapped
      className={twMerge(
        'flex-col',
        !inPreview &&
          !inMissing &&
          !inSearch &&
          !isMobile &&
          'bg-bgPrimary dark:bg-bgPrimaryDark sticky top-10',
      )}
    >
      <div>
        <DeckCryptHeader
          cards={crypt}
          deck={deck}
          inMissing={inMissing}
          setShowInfo={setShowInfo}
          setSortMethod={changeCryptDeckSort}
          showInfo={showInfo}
          sortMethod={cryptDeckSort}
          sortMethods={sortMethods}
        />
        <DeckCryptTable
          deck={deck}
          handleClick={handleClick}
          cards={sortedCards}
          cryptTotal={cryptTotal}
          showInfo={showInfo}
          disciplinesSet={disciplinesSet}
          keyDisciplines={keyDisciplines}
          inSearch={inSearch}
          inMissing={inMissing}
          noDisciplines={noDisciplines}
          shouldShowModal={shouldShowModal}
        />
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="opacity-60 dark:opacity-50">
          <div className="bg-bgSecondary dark:bg-bgSecondaryDark flex h-[42px] items-center p-2 font-bold">
            Side Crypt
          </div>
          <DeckCryptTable
            deck={deck}
            handleClick={handleClickSide}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            showInfo={showInfo}
            keyDisciplines={keyDisciplines}
            noDisciplines={noDisciplines}
            inSearch={inSearch}
            inMissing={inMissing}
            shouldShowModal={shouldShowModal}
            inSide
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

export default DeckCrypt;
