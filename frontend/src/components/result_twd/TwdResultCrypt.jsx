import React from 'react';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  UsedPopover,
  ResultCryptName,
  ResultCryptCapacity,
  ResultClanImage,
  ResultModal,
  ConditionalTooltip,
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
      <tr key={card.c.Id} className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${idx % 2 ? 'bg-bgThird dark:bg-bgThirdDark' : 'bg-bgPrimary dark:bg-bgPrimaryDark'}`}>
        {inventoryMode ? (
          <td className="quantity-no-buttons ">
            <ConditionalTooltip
              overlay={<UsedPopover cardid={card.c.Id} />}
              disabled={isMobile}
            >
              <div
                className={
                  inInventory < card.q
                    ? 'bg-bgError dark:bg-bgErrorDark text-bgCheckbox dark:text-bgCheckboxDark'
                    : inInventory - hardUsedTotal < card.q
                    ? 'bg-bgWarning dark:bg-bgWarningDark'
                    : null
                }
              >
                {card.q}
              </div>
            </ConditionalTooltip>
          </td>
        ) : (
          <td className="quantity-no-buttons ">{card.q}</td>
        )}
        <td className="capacity " onClick={() => handleClick(card.c)}>
          <ResultCryptCapacity value={card.c.Capacity} />
        </td>

        <td className="name " onClick={() => handleClick(card.c)}>
          <ConditionalTooltip
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <ResultCryptName card={card.c} />
          </ConditionalTooltip>
        </td>

        <td className="clan " onClick={() => handleClick(card.c)}>
          <ResultClanImage value={card.c.Clan} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div>
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
          handleClose={handleModalCardClose}
        />
      )}
    </>
  );
};

export default TwdResultCrypt;
