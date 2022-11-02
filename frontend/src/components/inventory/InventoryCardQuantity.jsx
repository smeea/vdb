import React, { useState, useEffect } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useApp, inventoryCardChangeState } from 'context';

const InventoryCardQuantity = ({
  q,
  cardid,
  softUsedMax,
  hardUsedTotal,
  compact,
  newFocus,
  handleCardChange,
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

  const handleSubmitButton = (event) => {
    event.preventDefault();
    if (compact && q === 0) newFocus();
    inventoryCardChangeState(card, state ? parseInt(state) : 0);
    setManual(false);
  };

  const handleQuantityChange = (diff) => {
    if (diff + state >= 0) setState(diff + state);
    if (handleCardChange) {
      handleCardChange(card, parseInt(diff + state));
    }
    inventoryCardChangeState(card, parseInt(diff + state));
  };

  return (
    <div className="d-flex align-items-center justify-content-between w-100">
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
                ? 'px-0'
                : state < softUsedMax + hardUsedTotal
                ? 'px-1 mx-1 inv-miss-full'
                : 'px-1'
            }
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
