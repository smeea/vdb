import React from 'react';
import { Button } from 'react-bootstrap';
import { Plus, Dash } from 'react-bootstrap-icons';

function DeckCardQuantity(props) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <Button
        variant="outline-secondary"
        onClick={(e) =>
          props.deckCardChange(props.deckid, props.cardid, props.q + 1)
        }
      >
        <Plus size={16} />
      </Button>
      {props.q == 0 ? null : props.q}
      <Button
        variant="outline-secondary"
        onClick={(e) =>
          props.deckCardChange(props.deckid, props.cardid, props.q - 1)
        }
      >
        <Dash size={16} />
      </Button>
    </div>
  );
}

export default DeckCardQuantity;
