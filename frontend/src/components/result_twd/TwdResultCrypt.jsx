import React from 'react';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  UsedPopover,
  ResultCryptName,
  ResultCryptCapacity,
  ResultClanImage,
  ResultModal,
  ConditionalOverlayTrigger,
} from 'components';
import { getHardTotal } from 'utils';
import { useApp, inventoryStore, usedStore } from 'context';
import { useDeckCrypt, useModalCardController } from 'hooks';

const TwdResultCrypt = ({ crypt }) => {
  const { cryptDeckSort, inventoryMode, isMobile, setShowFloatingButtons } =
    useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;

  const { cryptGroups, hasBanned, cryptTotal, sortedCards } = useDeckCrypt(
    crypt,
    cryptDeckSort,
    true
  );

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
    setShowFloatingButtons(true);
  };

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const cardLines = sortedCards.map((card, idx) => {
    let inInventory = 0;
    let hardUsedTotal = 0;

    if (inventoryMode) {
      if (inventoryCrypt[card.c.Id]) {
        inInventory = inventoryCrypt[card.c.Id].q;
      }

      hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]);
    }

    return (
      <tr key={card.c.Id} className={`result-${idx % 2 ? 'even' : 'odd'}`}>
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
        <td className="capacity px-1" onClick={() => handleClick(card.c)}>
          <ResultCryptCapacity value={card.c.Capacity} />
        </td>

        <ConditionalOverlayTrigger
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile}
        >
          <td className="name px-1" onClick={() => handleClick(card.c)}>
            <ResultCryptName card={card.c} />
          </td>
        </ConditionalOverlayTrigger>

        <td className="clan px-1" onClick={() => handleClick(card.c)}>
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
