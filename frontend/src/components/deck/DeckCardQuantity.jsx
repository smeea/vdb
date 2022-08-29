import React, { useEffect, useState, useMemo } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useApp } from 'context';

const DeckCardQuantity = ({
  deckid,
  cardid,
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
    cardChange(deckid, cardid, state ? state : 0);
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
    <div className="d-flex align-items-center justify-content-between">
      {isMobile ? (
        <>
          <a
            className="quantity"
            onClick={() => cardChange(deckid, cardid, q - 1)}
          >
            <Button className="quantity" variant="primary">
              -
            </Button>
          </a>
          <div className={miss ? `px-1 mx-1 ${miss}` : 'px-1'}>
            {q == 0 ? '' : q}
          </div>
          <a
            className="quantity"
            onClick={() => cardChange(deckid, cardid, q + 1)}
          >
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
              onClick={() => cardChange(deckid, cardid, q - 1)}
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
              <Form className="m-0" onSubmit={handleSubmitButton}>
                <FormControl
                  className="quantity px-1"
                  placeholder=""
                  type="number"
                  name="Quantity"
                  autoFocus={true}
                  value={state}
                  onBlur={handleSubmitButton}
                  onChange={handleManualChange}
                />
              </Form>
            ) : (
              <>{q == 0 ? <>&nbsp;&nbsp;</> : q}</>
            )}
          </div>
          {!manual && (
            <Button
              className="quantity"
              variant="primary"
              onClick={() => cardChange(deckid, cardid, q + 1)}
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
