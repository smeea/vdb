import React, { useState, useContext } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import AppContext from '../../context/AppContext.js';

function InventoryCardQuantity(props) {
  const { inventoryCardChange, isMobile } = useContext(AppContext);
  const [manual, setManual] = useState(false);
  const [state, setState] = useState(props.q);

  const handleManualChange = (event) => {
    setState(event.target.value);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    inventoryCardChange(props.cardid, parseInt(state));
    setManual(false);
  };

  const handleQuantityChange = (diff) => {
    if (state + diff >= 0) setState(state + diff);
    inventoryCardChange(props.cardid, state + diff);
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      {isMobile ? (
        <>
          <a className="quantity" onClick={() => handleQuantityChange(-1)}>
            <Button className="quantity" variant="outline-secondary">
              -
            </Button>
          </a>
          <div
            className={
              state < props.softUsedMax + props.hardUsedTotal
                ? 'px-1 mx-1 inv-miss-full'
                : 'px-1'
            }
          >
            {state == 0 ? <>&nbsp;&nbsp;</> : state}
          </div>
          <a className="quantity" onClick={() => handleQuantityChange(1)}>
            <Button className="quantity" variant="outline-secondary">
              +
            </Button>
          </a>
        </>
      ) : (
        <>
          {!manual && (
            <Button
              className="quantity"
              onClick={() => handleQuantityChange(-1)}
              variant="outline-secondary"
            >
              -
            </Button>
          )}
          <div
            className={
              manual
                ? 'px-0'
                : state < props.softUsedMax + props.hardUsedTotal
                ? 'px-1 mx-1 inv-miss-full'
                : 'px-1'
            }
            onClick={() => setManual(true)}
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
              <>{state == 0 ? <>&nbsp;&nbsp;</> : state}</>
            )}
          </div>
          {!manual && (
            <Button
              className="quantity"
              variant="outline-secondary"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default InventoryCardQuantity;
