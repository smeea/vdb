import React from 'react';
import { Button } from 'react-bootstrap';

function DeckCardQuantity(props) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <Button
        variant="outline-secondary"
        onClick={(e) =>
          props.deckCardChange(props.deckid, props.cardid, props.q + 1)
        }
      >
        +
      </Button>
      {props.q == 0 ? null : props.q}
      <Button
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
