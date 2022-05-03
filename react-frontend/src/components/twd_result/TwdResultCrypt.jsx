import React from 'react';
import {
  CardPopover,
  UsedPopover,
  ResultCryptName,
  ResultCryptCapacity,
  ResultClanImage,
  ResultModal,
  ConditionalOverlayTrigger,
} from 'components';
import { ANY } from 'utils/constants';
import { countCards, getHardTotal } from 'utils';
import { useApp } from 'context';

import { useModalCardController } from 'hooks';

const TwdResultCrypt = ({ crypt, setShowFloatingButtons }) => {
  const { inventoryMode, inventoryCrypt, usedCryptCards, isNarrow, isMobile } =
    useApp();

  let resultTrClass = 'result-even';

  // Sort cards
  const SortByQuantity = (a, b) => b.q - a.q;
  const SortByCapacity = (a, b) => b.c.Capacity - a.c.Capacity;

  const sortedCards = Object.values(crypt)
    .sort(SortByQuantity)
    .sort(SortByCapacity);

  const cryptTotal = countCards(sortedCards);

  const hasBanned = sortedCards.filter((card) => card.c.Banned).length > 0;

  let cryptGroupMin = undefined;
  let cryptGroupMax = undefined;
  if (sortedCards.length) {
    cryptGroupMin = sortedCards
      .filter((card) => card.c.Group !== ANY)
      .reduce(
        (acc, card) => (acc = card.c.Group < acc ? card.c.Group : acc),
        10
      );

    cryptGroupMax = sortedCards
      .filter((card) => card.c.Group !== ANY)
      .reduce(
        (acc, card) => (acc = card.c.Group > acc ? card.c.Group : acc),
        0
      );
  }

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const handleCloseModal = () => {
    handleModalCardClose();
    isNarrow && setShowFloatingButtons(true);
  };

  const cardLines = sortedCards.map((card, index) => {
    const handleClick = () => {
      handleModalCardOpen(index);
      isNarrow && setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    let inInventory = 0;
    let hardUsedTotal = 0;

    if (inventoryMode) {
      if (inventoryCrypt[card.c.Id]) {
        inInventory = inventoryCrypt[card.c.Id].q;
      }

      hardUsedTotal = getHardTotal(usedCryptCards.hard[card.c.Id]);
    }

    return (
      <tr key={card.c.Id} className={resultTrClass}>
        {inventoryMode ? (
          <ConditionalOverlayTrigger
            overlay={<UsedPopover cardid={card.c.Id} />}
            disabled={isMobile}
          >
            <td className="quantity-no-buttons px-1">
              <div
                className={
                  inInventory < card.q
                    ? 'inv-miss-full'
                    : inInventory - hardUsedTotal < card.q
                    ? 'inv-miss-part'
                    : null
                }
              >
                {card.q}
              </div>
            </td>
          </ConditionalOverlayTrigger>
        ) : (
          <td className="quantity-no-buttons px-1">{card.q}</td>
        )}
        <td className="capacity px-1" onClick={() => handleClick()}>
          <ResultCryptCapacity value={card.c.Capacity} />
        </td>

        <ConditionalOverlayTrigger
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile}
        >
          <td className="name px-1" onClick={() => handleClick()}>
            <ResultCryptName card={card.c} />
          </td>
        </ConditionalOverlayTrigger>

        <td className="clan px-1" onClick={() => handleClick()}>
          <ResultClanImage value={card.c.Clan} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="px-1">
        <b>
          Crypt [{cryptTotal}] - {cryptGroups}
          {hasBanned && ' - WITH BANNED'}
        </b>
      </div>
      <table className="twd-crypt-table">
        <tbody>{cardLines}</tbody>
      </table>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TwdResultCrypt;
