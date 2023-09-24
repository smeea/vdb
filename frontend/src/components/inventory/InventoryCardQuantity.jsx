import React, { useState, useEffect } from 'react';
import { Button } from '@/components';
import { useApp, inventoryCardChange } from '@/context';

const InventoryCardQuantity = ({
  card,
  softUsedMax,
  hardUsedTotal,
  compact,
  newFocus,
}) => {
  const { isMobile } = useApp();
  const [manual, setManual] = useState(false);
  const [state, setState] = useState(card.q ?? '');

  useEffect(() => {
    if (state !== card.q) setState(card.q ?? '');
  }, [card.q]);

  useEffect(() => {
    if (compact && card.q === 0) setManual(true);
  }, [card.Id]);

  const handleManualChange = (event) => {
    setState(event.target.value ?? '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (compact && card.q === 0) newFocus();
    inventoryCardChange(card.c, state ? parseInt(state) : 0);
    setManual(false);
  };

  const handleQuantityChange = (diff) => {
    if (diff + state >= 0) setState(diff + state);
    inventoryCardChange(card.c, parseInt(diff + state));
  };

  return (
    <div className="flex w-full items-center justify-between text-lg">
      {isMobile ? (
        <>
          <a
            className="relative before:absolute before:inset-[-12px] before:content-[''] hover:no-underline"
            onClick={() => handleQuantityChange(-1)}
          >
            <Button
              className="h-[27px] w-[18px] text-sm"
              variant="primary"
              noPadding
            >
              -
            </Button>
          </a>
          <div
            className={
              state < softUsedMax + hardUsedTotal
                ? 'mx-1 flex w-full justify-center bg-bgError text-bgCheckbox dark:bg-bgErrorDark dark:text-bgCheckboxDark'
                : null
            }
          >
            {state == 0 ? <>&nbsp;</> : state}
          </div>
          <a
            className="relative before:absolute before:inset-[-12px] before:content-[''] hover:no-underline"
            onClick={() => handleQuantityChange(1)}
          >
            <Button
              className="h-[27px] w-[18px] text-sm"
              variant="primary"
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
              onClick={() => handleQuantityChange(-1)}
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
                : `mx-1 flex w-full justify-center ${
                    state < softUsedMax + hardUsedTotal
                      ? 'bg-bgError text-bgCheckbox dark:bg-bgErrorDark dark:text-bgCheckboxDark'
                      : ''
                  }`
            }
            onFocus={() => setManual(true)}
          >
            {manual ? (
              <form onSubmit={handleSubmit}>
                <input
                  className="w-[63px] rounded-sm border-2 border-bgSecondary bg-bgPrimary text-center text-fgPrimary outline-1 outline-bgCheckboxSelected focus:outline dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
                  placeholder=""
                  type="number"
                  autoFocus={true}
                  value={state}
                  onBlur={handleSubmit}
                  onChange={handleManualChange}
                />
              </form>
            ) : (
              <>{state == 0 ? <>&nbsp;</> : state}</>
            )}
          </div>
          {!manual && (
            <Button
              className="h-[27px] min-w-[18px] text-sm"
              variant="primary"
              onClick={() => handleQuantityChange(1)}
              tabIndex={-1}
              noPadding
            >
              +
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default InventoryCardQuantity;
