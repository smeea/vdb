import React, { useEffect, useState } from 'react';
import { Button } from '@/components';
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
            ? 'bg-bgError dark:bg-bgErrorDark text-bgCheckbox dark:text-bgCheckboxDark'
            : '';
        } else {
          return inInventory < softUsedMax + hardUsedTotal
            ? inInventory < q
              ? 'bg-bgError dark:bg-bgErrorDark text-bgCheckbox dark:text-bgCheckboxDark'
              : inventoryType === 'h'
              ? 'bg-bgWarning dark:bg-bgWarningDark'
              : ''
            : '';
        }
      } else {
        return inInventory - softUsedMax - hardUsedTotal >= q
          ? ''
          : inInventory - hardUsedTotal >= q
          ? 'bg-bgWarning dark:bg-bgWarningDark'
          : 'bg-bgError dark:bg-bgErrorDark text-bgCheckbox dark:text-bgCheckboxDark';
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
              <a
                className="relative before:absolute before:inset-[-12px] before:content-['']"
                onClick={() => cardChange(deckid, card, q - 1)}
              >
                <Button
                  variant="primary"
                  className="h-[27px] w-[18px] text-sm"
                  noPadding
                >
                  -
                </Button>
              </a>
              <div className={inventoryColor}>{q == 0 ? '' : q}</div>
              <a
                className="relative before:absolute before:inset-[-12px] before:content-['']"
                onClick={() => cardChange(deckid, card, q + 1)}
              >
                <Button
                  variant="primary"
                  className="h-[27px] w-[18px] text-sm"
                  noPadding
                >
                  +
                </Button>
              </a>
            </>
          ) : (
            <>
              {!manual && (
                <Button
                  className="h-[27px] min-w-[18px] text-sm"
                  variant="primary"
                  onClick={() => cardChange(deckid, card, q - 1)}
                  tabIndex={-1}
                  noPadding
                >
                  -
                </Button>
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
                {manual ? (
                  <form onSubmit={handleSubmit}>
                    <input
                      className="w-[63px] rounded-sm border-2 border-bgSecondary bg-bgPrimary text-center text-fgPrimary outline-2 outline-bgCheckboxSelected focus:outline dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
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
              </div>
              {!manual && (
                <Button
                  className="h-[27px] min-w-[18px] text-sm"
                  variant="primary"
                  onClick={() => cardChange(deckid, card, q + 1)}
                  tabIndex={-1}
                  noPadding
                >
                  +
                </Button>
              )}
            </>
          )}
        </div>
      ) : (
        <div
          className={`flex items-center justify-center text-lg ${inventoryColor}`}
        >
          {q || null}
        </div>
      )}
    </>
  );
};

export default DeckCardQuantity;
