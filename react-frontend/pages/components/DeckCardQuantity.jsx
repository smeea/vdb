import React from 'react';
import { Button } from 'react-bootstrap';

function DeckCardQuantity(props) {
  let className = "px-1";
  if (props.inInventory != null && props.q > props.inInventory) {
    className += " bg-red"
  }

  return (
    <div className="d-flex align-items-center justify-content-between">
      {props.isMobile ? (
        <>
          <a
            className="quantity"
            onClick={() =>
              props.cardChange(props.deckid, props.cardid, props.q - 1)
            }
          >
            <Button className="quantity" variant="outline-secondary">
              -
            </Button>
          </a>
          <div className={className}>{props.q == 0 ? '' : props.q}</div>
          <a
            className="quantity"
            onClick={() =>
              props.cardChange(props.deckid, props.cardid, props.q + 1)
            }
          >
            <Button className="quantity" variant="outline-secondary">
              +
            </Button>
          </a>
        </>
      ) : (
        <>
          <Button
            className="quantity"
            onClick={() =>
              props.cardChange(props.deckid, props.cardid, props.q - 1)
            }
            variant="outline-secondary"
          >
            -
          </Button>
          <div
            className={className}
          >
            {props.q == 0 ? '' : props.q}
          </div>
          <Button
            className="quantity"
            variant="outline-secondary"
            onClick={() =>
              props.cardChange(props.deckid, props.cardid, props.q + 1)
            }
          >
            +
          </Button>
        </>
      )}
    </div>
  );
}

export default DeckCardQuantity;
