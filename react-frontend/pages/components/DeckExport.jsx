import React, { useState } from 'react';
import FileSaver from 'file-saver';
import { Spinner, DropdownButton, Dropdown } from 'react-bootstrap';
import { Download } from 'react-bootstrap-icons';

function DeckExport(props) {
  const [spinnerState, setSpinnerState] = useState(false);
  const [deckError, setDeckError] = useState(false);

  const exportFormats = ['Text', 'TWD', 'Lackey'];

  const ExportButtonOptions = exportFormats.map((i, index) => {
    return (
      <Dropdown.Item key={index} href="" onClick={() => exportDeck(i.toLowerCase())}>
        Export to {i}
      </Dropdown.Item>
    );
  });

  const exportDeck = (format) => {
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
          console.log(data.deck);
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
          <Download /> Export to Lackey
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
