import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import AppContext from '../../context/AppContext.js';

function DeckCardQuantity(props) {
  const { isMobile } = useContext(AppContext);

  const [manual, setManual] = useState(false);
  const [state, setState] = useState(props.q);
  const [miss, setMiss] = useState(false);

  const handleManualChange = (event) => {
    setState(event.target.value ? event.target.value : 0);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    props.cardChange(props.deckid, props.cardid, parseInt(state));
    setManual(false);
  };

  useEffect(() => {
    if (state != props.q) setState(props.q);
  }, [props.q]);

  useEffect(() => {
    if (props.inventoryType) {
      if (props.inProxy) {
        setMiss(
          props.inInventory + (props.isSelected ? props.q : 0) <
            props.softUsedMax + props.hardUsedTotal
            ? 'inv-miss-full'
            : null
        );
      } else {
        setMiss(
          props.inInventory < props.softUsedMax + props.hardUsedTotal
            ? props.inInventory < props.q
              ? 'inv-miss-full'
              : 'inv-miss-part'
            : null
        );
      }
    } else {
      setMiss(null);
    }
  }, [
    props.q,
    props.inventoryType,
    props.inProxy,
    props.softUsedMax,
    props.hardUsedTotal,
    props.isSelected,
  ]);

  return (
    <div className="d-flex align-items-center justify-content-between">
      {isMobile ? (
        <>
          <a
            className="quantity"
            onClick={() =>
              props.cardChange(props.deckid, props.cardid, props.q - 1)
            }
          >
            <Button className="quantity" variant="primary">
              -
            </Button>
          </a>
          <div className={miss ? `px-1 mx-1 ${miss}` : 'px-1'}>
            {props.q == 0 ? '' : props.q}
          </div>
          <a
            className="quantity"
            onClick={() =>
              props.cardChange(props.deckid, props.cardid, props.q + 1)
            }
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
              onClick={() =>
                props.cardChange(props.deckid, props.cardid, props.q - 1)
              }
              variant="primary"
            >
              -
            </Button>
          )}
          <div
            className={manual ? 'px-0' : miss ? `px-1 mx-1 ${miss}` : 'px-1'}
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
              <>{props.q == 0 ? <>&nbsp;&nbsp;</> : props.q}</>
            )}
          </div>
          {!manual && (
            <Button
              className="quantity"
              variant="primary"
              onClick={() =>
                props.cardChange(props.deckid, props.cardid, props.q + 1)
              }
            >
              +
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default DeckCardQuantity;
