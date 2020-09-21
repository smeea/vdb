import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function DeckAuthorDeck(props) {
  const [state, setState] = useState(props.author);

  const handleChange = event => {
    setState(event.target.value);
  };

  const handleButton = () => {
    if (state) {
      props.deckUpdate(props.deckid, 'author', state);
    } else {
      console.log('Error: submit with empty form');
    };
  };

  useEffect(() => {
    setState(props.author);
  }, [props.author]);

  return (
    <div className="input-group mb-2">
      <div className="input-group-prepend">
        <span className="input-group-text">
          Author
        </span>
      </div>
      { props.isAuthor
        ? <input type="text"
                 className="form-control"
                 placeholder="Author"
                 value={state}
                 onChange={handleChange}
          />
        : <div className='form-control'>
            {state}
          </div>
      }
      { props.isAuthor &&
        <Button variant='outline-secondary' onClick={handleButton}>
          Change
        </Button>
      }
    </div>
  );
}

export default DeckAuthorDeck;
