import React, { useState } from 'react';
import FileSaver from 'file-saver';
import { Spinner, DropdownButton, Dropdown } from 'react-bootstrap';
import { Download } from 'react-bootstrap-icons';

function DeckExport(props) {
  const [spinnerState, setSpinnerState] = useState(false);
  const [deckError, setDeckError] = useState(false);

  const saveFormats = [
    'Text',
    'TWD',
    'Lackey'
  ];

  const copyFormats = [
    'Text',
    'TWD',
    'Lackey'
  ];

  const ExportButtonOptions = []

  saveFormats.map((i, index) => {
    ExportButtonOptions.push(
      <Dropdown.Item key={index + 's'} href="" onClick={() => saveDeck(i.toLowerCase())}>
        Save as file - {i}
      </Dropdown.Item>
    );
  });

  copyFormats.map((i, index) => {
    ExportButtonOptions.push(
      <Dropdown.Item key={index + 'c'} href="" onClick={() => copyDeck(i.toLowerCase())}>
        Copy to clipboard - {i}
      </Dropdown.Item>
    );
  });

  const copyDeck = (format) => {
    setDeckError(false);
    if (props.activeDeck) {
      setSpinnerState(true);

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
          navigator.clipboard.writeText(data.deck);
          setSpinnerState(false);
          // setState(true);
          // setTimeout(() => setState(false), 500);
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
          const file = new File(
            [data.deck],
            data.name + '_' + data.format + '.txt',
            { type: 'text/plain;charset=utf-8' }
          );
          FileSaver.saveAs(file);
          setSpinnerState(false);
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
    <div className="mb-3">
      {!spinnerState ? (
        <DropdownButton
          variant="outline-secondary"
          id="export-button"
          title={<><Download size={20} /> Export</>}
        >
          {ExportButtonOptions}
        </DropdownButton>
      ) : (
        <DropdownButton
          variant="outline-secondary"
          id="export-button"
          title={<><Download size={20} /> Export</>}
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <Spinner />
          {ExportButtonOptions}
        </DropdownButton>
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
