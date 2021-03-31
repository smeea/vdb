import React, { useState, useRef } from 'react';
import FileSaver from 'file-saver';
import { Spinner, Dropdown, Overlay } from 'react-bootstrap';
import Download from '../../assets/images/icons/download.svg';

function DeckExport(props) {
  const [spinnerState, setSpinnerState] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);

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
      {props.username && (
        <>
          <Dropdown.Divider />
          <Dropdown.Item href="" onClick={() => exportAll('text')}>
            Save all decks - Text
          </Dropdown.Item>
          <Dropdown.Item href="" onClick={() => exportAll('twd')}>
            Save all decks - TWD
          </Dropdown.Item>
          <Dropdown.Item href="" onClick={() => exportAll('lackey')}>
            Save all decks - Lackey
          </Dropdown.Item>
        </>
      )}
    </>
  );

  const copyDeck = (format) => {
    setError(false);
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
          deckid: props.activeDeck.deckid,
          format: format,
          src: props.activeDeck.src,
        }),
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          navigator.clipboard.writeText(data.deck);
          setSpinnerState(false);
          props.isMobile && props.setShowButtons(false);
        })
        .catch((error) => {
          setError(true);
          setSpinnerState(false);
        });
    } else {
      setError(true);
    }
  };

  const saveDeck = (format) => {
    setError(false);
    if (props.activeDeck) {
      setSpinnerState(true);

      const input = {
        deckid: props.activeDeck.deckid,
        format: format,
        src: props.activeDeck.src,
      };

      if (input.src == 'shared') {
        const cards = {};
        Object.keys(props.deck.crypt).map((key) => {
          cards[key] = props.deck.crypt[key].q;
        });
        Object.keys(props.deck.library).map((key) => {
          cards[key] = props.deck.library[key].q;
        });

        input.deck = {
          cards: cards,
          name: props.deck.name,
          description: props.deck.description,
          author: props.deck.author,
        };
      }

      const url = `${process.env.API_URL}decks/export`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
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
          props.isMobile && props.setShowButtons(false);
        })
        .catch((error) => {
          setSpinnerState(false);
          setError(true);
        });
    } else {
      setError(true);
    }
  };

  const exportAll = (format) => {
    setError(false);

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
        deckid: 'all',
        format: format,
      }),
    };

    const fetchPromise = fetch(url, options);

    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        data.map((d) => {
          const file = new File([d.deck], d.name + '_' + d.format + '.txt', {
            type: 'text/plain;charset=utf-8',
          });
          FileSaver.saveAs(file);
        });
        setSpinnerState(false);
      })
      .catch((error) => {
        setError(true);
        setSpinnerState(false);
      });
  };

  return (
    <>
      <Dropdown ref={ref}>
        <Dropdown.Toggle className="btn-block" variant="outline-secondary">
          <Download />
          <span className="pl-1">Export Deck</span>
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
      <Overlay
        show={error}
        target={ref.current}
        placement="left"
        transition={false}
      >
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div className="modal-tooltip error-tooltip small" {...props}>
            <b>ERROR</b>
          </div>
        )}
      </Overlay>
    </>
  );
}

export default DeckExport;
