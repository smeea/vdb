import React, { useState, useEffect } from 'react';
import { Button } from 'components';
import { useApp, inventoryCardChange } from 'context';

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
    <div className="flex w-full items-center justify-between">
      {isMobile ? (
        <>
          <a className="quantity" onClick={() => handleQuantityChange(-1)}>
            <Button className="quantity" variant="primary">
              -
            </Button>
          </a>
          <div
            className={
              state < softUsedMax + hardUsedTotal ? 'inv-miss-full' : null
            }
          >
            {state == 0 ? <>&nbsp;&nbsp;</> : state}
          </div>
          <a className="quantity" onClick={() => handleQuantityChange(1)}>
            <Button className="quantity" variant="primary">
              +
            </Button>
          </a>
        </>
      ) : (
        <>
          {!manual && (
            <Button
              className="quantity"
              variant="primary"
              onClick={() => handleQuantityChange(-1)}
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
                : state < softUsedMax + hardUsedTotal
                ? 'inv-miss-full '
                : ''
            }
            onFocus={() => setManual(true)}
          >
            {manual ? (
              <form onSubmit={handleSubmit}>
                <input
                  className="quantity"
                  placeholder=""
                  type="number"
                  name="Quantity"
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
              className="quantity"
              variant="primary"
              onClick={() => handleQuantityChange(1)}
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

export default InventoryCardQuantity;
