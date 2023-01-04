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

  const cardRows = sortedCards.map((card, idx) => {
    const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
    const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]);

    return (
      <tr
        key={card.c.Id}
        className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
          idx % 2
            ? 'bg-bgThird dark:bg-bgThirdDark'
            : 'bg-bgPrimary dark:bg-bgPrimaryDark'
        }`}
      >
        <td className="min-w-[28px] sm:min-w-[35px] bg-[#0000aa]/5 border-r border-bgSecondary dark:border-bgSecondaryDark">
          {inventoryMode ? (
            <ConditionalTooltip
              overlay={<UsedPopover cardid={card.c.Id} />}
              disabled={isMobile}
            >
              <div
                className={`flex justify-center text-lg ${
                  inInventory < card.q
                    ? 'bg-bgError text-bgCheckbox dark:bg-bgErrorDark dark:text-bgCheckboxDark'
                    : inInventory - hardUsedTotal < card.q
                    ? 'bg-bgWarning dark:bg-bgWarningDark'
                    : null
                }`}
              >
                {card.q}
              </div>
            </ConditionalTooltip>
          ) : (
            <div className="flex justify-center text-lg">{card.q}</div>
          )}
        </td>
        <td
          className="min-w-[30px] sm:min-w-[40px]"
          onClick={() => handleClick(card.c)}
        >
          <div className="flex justify-center">
            <ResultCryptCapacity value={card.c.Capacity} />
          </div>
        </td>

        <td className="w-full" onClick={() => handleClick(card.c)}>
          <ConditionalTooltip
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <ResultCryptName card={card.c} />
          </ConditionalTooltip>
        </td>
        <td className="min-w-[30px]" onClick={() => handleClick(card.c)}>
          <div className="flex justify-center">
            <ResultClanImage value={card.c.Clan} />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="font-bold">
        Crypt [{cryptTotal}] {cryptGroups}
        {hasBanned && ' - WITH BANNED'}
      </div>
      <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
        <tbody>{cardRows}</tbody>
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
