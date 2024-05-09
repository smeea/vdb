import React, { useEffect, useState } from 'react';
import {
  ConditionalTooltip,
  UsedPopover,
  ButtonCardChange,
} from '@/components';
import { useApp } from '@/context';

const DeckCardQuantity = ({
  deckid,
  card,
  q,
  inventoryType,
  inInventory,
  softUsedMax,
  hardUsedTotal,
  isSelected,
  cardChange,
  inProxy,
  isEditable,
  inMissing,
}) => {
  const { inventoryMode, isMobile } = useApp();
  const [manual, setManual] = useState(false);
  const [state, setState] = useState(q ? q : '');

  useEffect(() => {
    if (state !== q) setState(q ? q : '');
  }, [q]);

  const handleManualChange = (event) => {
    setState(event.target.value ? parseInt(event.target.value) : '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cardChange(deckid, card, state ? state : 0);
    setManual(false);
  };

  const getInventoryColor = () => {
    if (inventoryMode && !inMissing) {
      if (inventoryType) {
        if (inProxy) {
          return inInventory + (isSelected ? q : 0) <
            softUsedMax + hardUsedTotal
            ? 'bg-bgError dark:bg-bgErrorDark text-white dark:text-whiteDark'
            : '';
        } else {
          return inInventory >= softUsedMax + hardUsedTotal
            ? ''
            : inInventory < q
            ? 'bg-bgError dark:bg-bgErrorDark text-white dark:text-whiteDark'
            : 'bg-bgWarning dark:bg-bgWarningDark';
        }
      } else {
        return inInventory - softUsedMax - hardUsedTotal >= q
          ? ''
          : inInventory < q
          ? 'bg-bgError dark:bg-bgErrorDark text-white dark:text-whiteDark'
          : 'bg-bgWarning dark:bg-bgWarningDark';
      }
    } else {
      return '';
    }
  };

  const inventoryColor = getInventoryColor();

  return (
    <>
      {isEditable ? (
        <div className="flex items-center justify-between text-lg">
          {isMobile ? (
            <>
              <ButtonCardChange
                onClick={() => cardChange(deckid, card, q - 1)}
                isLink
                isNegative
              />
              <div
                className={`mx-1 flex w-full justify-center ${inventoryColor}`}
              >
                {q == 0 ? '' : q}
              </div>
              <ButtonCardChange
                onClick={() => cardChange(deckid, card, q + 1)}
                isLink
              />
            </>
          ) : (
            <>
              {!manual && (
                <ButtonCardChange
                  onClick={() => cardChange(deckid, card, q - 1)}
                  isNegative
                />
              )}
              <div
                tabIndex={0}
                className={
                  manual
                    ? ''
                    : `mx-1 flex w-full justify-center ${inventoryColor}`
                }
                onFocus={() => setManual(true)}
              >
                <ConditionalTooltip
                  placement="bottom"
                  overlay={<UsedPopover cardid={card.Id} />}
                  disabled={!inventoryMode || isMobile}
                >
                  {manual ? (
                    <form onSubmit={handleSubmit}>
                      <input
                        className="w-[63px] rounded-sm border-2 border-bgSecondary bg-bgPrimary text-center text-fgPrimary outline-1 outline-bgCheckboxSelected focus:outline dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
                        placeholder=""
                        type="number"
                        value={state}
                        onBlur={handleSubmit}
                        onChange={handleManualChange}
                        autoFocus
                      />
                    </form>
                  ) : (
                    <>{q == 0 ? <>&nbsp;&nbsp;</> : q}</>
                  )}
                </ConditionalTooltip>
              </div>
              {!manual && (
                <ButtonCardChange
                  onClick={() => cardChange(deckid, card, q + 1)}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <ConditionalTooltip
          placement="bottom"
          overlay={<UsedPopover cardid={card.Id} />}
          disabled={!inventoryMode || isMobile}
        >
          <div className={`flex justify-center text-lg ${inventoryColor}`}>
            {q || null}
          </div>
        </ConditionalTooltip>
      )}
    </>
  );
};

export default DeckCardQuantity;
