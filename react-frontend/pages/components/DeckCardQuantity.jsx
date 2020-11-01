import React from 'react';
import { Button } from 'react-bootstrap';

function DeckCardQuantity(props) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <Button
        className="quantity"
        variant="outline-secondary"
        onClick={(e) =>
          props.deckCardChange(props.deckid, props.cardid, props.q + 1)
        }
      >
        +
      </Button>
      <div className="px-1">{props.q == 0 ? '' : props.q}</div>
      <Button
        className="quantity"
        variant="outline-secondary"
        onClick={(e) =>
          props.deckCardChange(props.deckid, props.cardid, props.q - 1)
        }
      >
        -
      </Button>
    </div>
  );
}

export default DeckCardQuantity;
