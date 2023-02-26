import React, { useState, useEffect } from 'react';
import { Button } from '@/components';
import { useApp, inventoryCardChange } from '@/context';

const InventoryCardQuantity = ({
  q,
  cardid,
  softUsedMax,
  hardUsedTotal,
  compact,
  newFocus,
}) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const [manual, setManual] = useState(false);
  const [state, setState] = useState(q ? q : '');

  const card =
    cardid > 200000 ? cryptCardBase[cardid] : libraryCardBase[cardid];

  useEffect(() => {
    if (state !== q) setState(q ? q : '');
  }, [q]);

  useEffect(() => {
    if (compact && q === 0) setManual(true);
  }, [cardid]);

  const handleManualChange = (event) => {
    setState(event.target.value ? event.target.value : '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (compact && q === 0) newFocus();
    inventoryCardChange(card, state ? parseInt(state) : 0);
    setManual(false);
  };

  const handleQuantityChange = (diff) => {
    if (diff + state >= 0) setState(diff + state);
    inventoryCardChange(card, parseInt(diff + state));
  };

  return (
    <div className="flex w-full items-center justify-between text-lg">
      {isMobile ? (
        <>
          <a
            className="relative hover:no-underline before:absolute before:inset-[-12px] before:content-['']"
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
            className="relative hover:no-underline before:absolute before:inset-[-12px] before:content-['']"
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
                  className="w-[63px] rounded-sm border-2 border-bgSecondary bg-bgPrimary text-center text-fgPrimary outline-bgCheckboxSelected focus:outline outline-1 dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
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
