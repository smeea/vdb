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

  const handleSubmitButton = (event) => {
    event.preventDefault();
    cardChange(deckid, card, state ? state : 0);
    setManual(false);
  };

  const miss = useMemo(() => {
    if (inventoryType) {
      if (inProxy) {
        return inInventory + (isSelected ? q : 0) < softUsedMax + hardUsedTotal
          ? 'inv-miss-full'
          : null;
      } else {
        return inInventory < softUsedMax + hardUsedTotal
          ? inInventory < q
            ? 'inv-miss-full'
            : inventoryType === 'h'
            ? 'inv-miss-part'
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
            className="quantity"
            onClick={() => cardChange(deckid, card, q - 1)}
          >
            <Button variant="primary" className="quantity">
              -
            </Button>
          </a>
          <div className={miss ? `px-1 mx-1 ${miss}` : 'px-1'}>
            {q == 0 ? '' : q}
          </div>
          <a
            className="quantity"
            onClick={() => cardChange(deckid, card, q + 1)}
          >
            <Button variant="primary" className="quantity">
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
              onClick={() => cardChange(deckid, card, q - 1)}
              tabIndex={-1}
            >
              -
            </Button>
          )}
          <div
            tabIndex={0}
            className={manual ? 'px-0' : miss ? `px-1 mx-1 ${miss}` : 'px-1'}
            onFocus={() => setManual(true)}
          >
            {manual ? (
              <form className="m-0" onSubmit={handleSubmitButton}>
                <input
                  className="quantity px-1"
                  placeholder=""
                  type="number"
                  name="Quantity"
                  autoFocus={true}
                  value={state}
                  onBlur={handleSubmitButton}
                  onChange={handleManualChange}
                />
              </form>
            ) : (
              <>{q == 0 ? <>&nbsp;&nbsp;</> : q}</>
            )}
          </div>
          {!manual && (
            <Button
              className="quantity"
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
