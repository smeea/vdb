import React from 'react';
import { ResultModal, TwdResultCryptTableRow, Warning } from '@/components';
import { useApp } from '@/context';
import { countCards, countTotalCost } from '@/utils';
import { useDeckCrypt, useModalCardController } from '@/hooks';
import { BANNED, GROUPS, CAPACITY } from '@/constants';

const TwdResultCryptTable = ({ crypt }) => {
  const { cryptDeckSort, setShowFloatingButtons } = useApp();
  const { cryptGroups, hasBanned, hasWrongGroups, cryptTotal, sortedCards } = useDeckCrypt(
    crypt,
    cryptDeckSort,
  );

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  const cryptTotalQ = countCards(sortedCards);
  const cryptTotalCap = countTotalCost(sortedCards, CAPACITY);
  const cryptAvg = Math.round((cryptTotalCap / cryptTotalQ) * 10) / 10;

  return (
    <div>
      <div className="flex h-[30px] items-center justify-between gap-2 px-1 font-bold text-fgSecondary dark:text-fgPrimaryDark">
        <div className="flex">
          Crypt [{cryptTotal}] {cryptGroups && <>G{cryptGroups}</>}
        </div>
        <div className="flex gap-2">
          {hasWrongGroups && <Warning type={GROUPS} />}
          {hasBanned && <Warning type={BANNED} />}
        </div>
        <div title="Average capacity">~{cryptAvg}</div>
      </div>
      <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
        <tbody>
          {sortedCards.map((card) => {
            return (
              <TwdResultCryptTableRow
                key={card.c.Id}
                handleClick={handleClick}
                card={card}
                shouldShowModal={shouldShowModal}
              />
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

export default TwdResultCryptTable;
