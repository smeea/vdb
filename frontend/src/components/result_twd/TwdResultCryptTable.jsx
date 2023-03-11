import React from 'react';
import { ResultModal, TwdResultCryptTableRow, Warning } from '@/components';
import { useApp } from '@/context';
import { useDeckCrypt, useModalCardController } from '@/hooks';

const TwdResultCryptTable = ({ crypt }) => {
  const { cryptDeckSort, setShowFloatingButtons } = useApp();

  const { cryptGroups, hasBanned, hasWrongGroups, cryptTotal, sortedCards } =
    useDeckCrypt(crypt, cryptDeckSort, true);

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

  return (
    <div>
      <div className="font-bold">
        Crypt [{cryptTotal}] {cryptGroups}{' '}
        {hasBanned && <Warning value="BANNED" />}
        {hasWrongGroups ? (
          <Warning value="GROUPS" />
        ) : (
          <div className="inline">{cryptGroups}</div>
        )}
      </div>
      <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
        <tbody>
          {sortedCards.map((card, idx) => {
            return (
              <TwdResultCryptTableRow
                key={card.c.Id}
                handleClick={handleClick}
                idx={idx}
                card={card}
              />
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

export default TwdResultCryptTable;
