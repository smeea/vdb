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
    if (inventoryMode && inventoryType) {
      if (inProxy) {
        return inInventory + (isSelected ? q : 0) < softUsedMax + hardUsedTotal
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
      return '';
    }
  };

  // TODO check if works OK inMissing
  //     className={
  //       inMissing
  //         ? null
  //         : inInventory < card.q
  //         ? 'inv-miss-full'
  //         : inInventory < hardUsedTotal + card.q
  //         ? 'inv-miss-part'
  //         : null
  //     }

  const inventoryColor = getInventoryColor();

  return (
    <div className="flex items-center justify-between text-lg">
      {isEditable || inProxy ? (
        <>
          {isMobile ? (
            <>
              <a
                className="relative before:absolute before:inset-[-12px] before:content-['']"
                onClick={() => cardChange(deckid, card, q - 1)}
              >
                <Button
                  variant="primary"
                  className="h-[27px] w-[18px] px-0 py-0 text-sm"
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
                  className="h-[27px] w-[18px] px-0 py-0 text-sm"
                >
                  +
                </Button>
              </a>
            </>
          ) : (
            <>
              {!manual && (
                <Button
                  className="h-[27px] min-w-[18px] px-0 py-0 text-sm"
                  variant="primary"
                  onClick={() => cardChange(deckid, card, q - 1)}
                  tabIndex={-1}
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
                  className="h-[27px] min-w-[18px] px-0 py-0 text-sm"
                  variant="primary"
                  onClick={() => cardChange(deckid, card, q + 1)}
                  tabIndex={-1}
                >
                  +
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        <div
          className={`flex w-full items-center justify-center ${inventoryColor} border-r border-bgSecondary bg-[#0000aa]/5 dark:border-bgSecondaryDark`}
        >
          {q || null}
        </div>
      )}
    </div>
  );
};

export default DeckCardQuantity;
