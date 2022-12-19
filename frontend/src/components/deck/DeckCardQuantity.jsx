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
          <div className={miss ? `${miss}` : ''}>{q == 0 ? '' : q}</div>
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
              className="w-[18px] h-[27px] px-0 py-0 text-sm"
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
                  className="w-[63px] h[32px] text-center text-black bg-red-500"
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
              className="w-[18px] h-[27px] px-0 py-0 text-sm"
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
