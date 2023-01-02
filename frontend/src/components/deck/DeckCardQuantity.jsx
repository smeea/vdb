import React, { useEffect, useState, useMemo } from 'react';
import { Button } from 'components';
import { useApp } from 'context';

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
}) => {
  const { isMobile } = useApp();

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

  const miss = useMemo(() => {
    if (inventoryType) {
      if (inProxy) {
        return inInventory + (isSelected ? q : 0) < softUsedMax + hardUsedTotal
          ? 'bg-bgError dark:bg-bgErrorDark text-bgCheckbox dark:text-bgCheckboxDark'
          : null;
      } else {
        return inInventory < softUsedMax + hardUsedTotal
          ? inInventory < q
            ? 'bg-bgError dark:bg-bgErrorDark text-bgCheckbox dark:text-bgCheckboxDark'
            : inventoryType === 'h'
            ? 'bg-bgWarning dark:bg-bgWarningDark'
            : null
          : null;
      }
    } else {
      return null;
    }
  }, [q, inventoryType, inProxy, softUsedMax, hardUsedTotal, isSelected]);

  return (
    <div className="flex items-center justify-between">
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
          <div className={miss ? `${miss}` : ''}>{q == 0 ? '' : q}</div>
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
              className="h-[27px] w-[18px] px-0 py-0 text-sm"
              variant="primary"
              onClick={() => cardChange(deckid, card, q - 1)}
              tabIndex={-1}
            >
              -
            </Button>
          )}
          <div
            tabIndex={0}
            className={manual ? '' : miss ? `${miss}` : ''}
            onFocus={() => setManual(true)}
          >
            {manual ? (
              <form onSubmit={handleSubmit}>
                <input
                  className="w-[63px] rounded-sm border-2 border-bgSecondary bg-bgPrimary text-center text-fgPrimary outline-2 outline-bgCheckboxSelected focus:outline dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
                  placeholder=""
                  type="number"
                  autoFocus={true}
                  value={state}
                  onBlur={handleSubmit}
                  onChange={handleManualChange}
                />
              </form>
            ) : (
              <>{q == 0 ? <>&nbsp;&nbsp;</> : q}</>
            )}
          </div>
          {!manual && (
            <Button
              className="h-[27px] w-[18px] px-0 py-0 text-sm"
              variant="primary"
              onClick={() => cardChange(deckid, card, q + 1)}
              tabIndex={-1}
            >
              +
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default DeckCardQuantity;
