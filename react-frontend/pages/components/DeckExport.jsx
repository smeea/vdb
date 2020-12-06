import React, { useState } from 'react';
import FileSaver from 'file-saver';
import { Spinner, Dropdown } from 'react-bootstrap';
import Download from '../../assets/images/icons/download.svg';

function DeckExport(props) {
  const [spinnerState, setSpinnerState] = useState(false);
  const [deckError, setDeckError] = useState(false);

  const ExportButtonOptions = (
    <>
      <Dropdown.Item href="" onClick={() => saveDeck('text')}>
        Save as file - Text
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => saveDeck('twd')}>
        Save as file - TWD
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => saveDeck('lackey')}>
        Save as file - Lackey
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="" onClick={() => copyDeck('text')}>
        Copy to Clipboard - Text
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => copyDeck('twd')}>
        Copy to Clipboard - TWD
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => copyDeck('lackey')}>
        Copy to Clipboard - Lackey
      </Dropdown.Item>
    </>
  );

  const copyDeck = (format) => {
    setDeckError(false);
    if (props.activeDeck) {
      setSpinnerState(true);

      const url = `${process.env.API_URL}decks/export`;
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
          navigator.clipboard.writeText(data.deck);
          setSpinnerState(false);
          props.setShowButtons(false);
        })
        .catch((error) => {
          console.log(error);
          setSpinnerState(false);
        });
    } else {
      setDeckError(true);
    }
  };

  const saveDeck = (format) => {
    setDeckError(false);
    if (props.activeDeck) {
      setSpinnerState(true);

      const url = `${process.env.API_URL}decks/export`;
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
          const file = new File(
            [data.deck],
            data.name + '_' + data.format + '.txt',
            { type: 'text/plain;charset=utf-8' }
          );
          FileSaver.saveAs(file);
          setSpinnerState(false);
          props.setShowButtons(false);
        })
        .catch((error) => {
          console.log(error);
          setSpinnerState(false);
        });
    } else {
      setDeckError(true);
    }
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="btn-block" variant="outline-secondary">
          <Download />
          <span className="pl-1">Save Deck</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {spinnerState && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {ExportButtonOptions}
        </Dropdown.Menu>
      </Dropdown>
      {deckError && (
        <div className="d-flex justify-content-start">
          <span className="login-error">Select deck to export</span>
        </div>
      )}
    </>
  );
}

export default DeckExport;
