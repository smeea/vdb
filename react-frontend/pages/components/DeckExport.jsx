import React, { useState } from 'react';
import FileSaver from 'file-saver';
import { Spinner, Button } from 'react-bootstrap';

function DeckExport(props) {
  const [spinnerState, setSpinnerState] = useState({lackey: false, text: false});
  const [deckError, setDeckError] = useState(false);

  const exportDeck = (format) => {
    setDeckError(false);
    if (props.activeDeck) {

      setSpinnerState({[format]: true});

      const url = process.env.API_URL + 'decks/export';
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deckid: props.activeDeck,
          format: format,
        }),
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          const file = new File([data.deck], data.name + '_' + data.format + '.txt', {type: "text/plain;charset=utf-8"});
          FileSaver.saveAs(file);
          console.log(data.deck);
          setSpinnerState({[format]: false});
        })
        .catch((error) => {
          console.log(error);
          setSpinnerState({[format]: false});
        });
    } else {
      setDeckError(true);
    }
  };

  return (
    <div className="mb-3">
      {!spinnerState['lackey'] ? (
        <Button variant="outline-secondary" onClick={() => exportDeck('lackey')}>
          Export to Lackey
        </Button>
      ) : (
        <Button variant="outline-secondary" onClick={() => exportDeck('lackey')}>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <Spinner />
          Export to Lackey
        </Button>
      )}
      {!spinnerState['twd'] ? (
        <Button variant="outline-secondary" onClick={() => exportDeck('twd')}>
          Export to TWD Text
        </Button>
      ) : (
        <Button variant="outline-secondary" onClick={() => exportDeck('twd')}>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <Spinner />
          Export to TWD
        </Button>
      )}
      {!spinnerState['text'] ? (
        <Button variant="outline-secondary" onClick={() => exportDeck('text')}>
          Export to Text
        </Button>
      ) : (
        <Button variant="outline-secondary" onClick={() => exportDeck('text')}>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <Spinner />
          Export to Text
        </Button>
      )}
      {deckError && (
        <div className="d-flex justify-content-start">
          <br />
          <span className="login-error">Select deck to export</span>
        </div>
      )}
    </div>
  );
}

export default DeckExport;
