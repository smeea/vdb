import React from 'react';
import { Button } from 'react-bootstrap';

function DeckCardQuantity(props) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      {props.isMobile ? (
        <>
          <a
            className="quantity"
            onClick={() =>
              props.deckCardChange(props.deckid, props.cardid, props.q - 1)
            }
          >
            <Button className="quantity" variant="outline-secondary">
              -
            </Button>
          </a>
          <div className="px-1">{props.q == 0 ? '' : props.q}</div>
          <a
            className="quantity"
            onClick={() =>
              props.deckCardChange(props.deckid, props.cardid, props.q + 1)
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
              props.deckCardChange(props.deckid, props.cardid, props.q - 1)
            }
            variant="outline-secondary"
          >
            -
          </Button>
          <div className="px-1">{props.q == 0 ? '' : props.q}</div>
          <Button
            className="quantity"
            variant="outline-secondary"
            onClick={() =>
              props.deckCardChange(props.deckid, props.cardid, props.q + 1)
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
