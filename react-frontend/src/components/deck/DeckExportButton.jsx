import React, { useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import {
  Spinner,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from 'react-bootstrap';
import Download from 'assets/images/icons/download.svg';
import { ErrorOverlay } from 'components';
import { useApp } from 'context';

const DeckExportButton = ({ deck, src, inMissing }) => {
  const { username, decks, setShowFloatingButtons, setShowMenuButtons } =
    useApp();

  const [spinnerState, setSpinnerState] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);

  const ButtonOptions = (
    <>
      <Dropdown.Item href="" onClick={() => saveDeck('text')}>
        Save as file - Text
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => saveDeck('twd')}>
        Save as file - TWD
      </Dropdown.Item>
      {!inMissing && (
        <>
          <Dropdown.Item href="" onClick={() => saveDeck('lackey')}>
            Save as file - Lackey
          </Dropdown.Item>
          <Dropdown.Item href="" onClick={() => saveDeck('jol')}>
            Save as file - JOL
          </Dropdown.Item>
        </>
      )}
      <Dropdown.Item href="" onClick={() => saveDeck('xlsx')}>
        Save as file - Excel
      </Dropdown.Item>
      {!inMissing && (
        <Dropdown.Item href="" onClick={() => saveDeck('csv')}>
          Save as file - CSV
        </Dropdown.Item>
      )}
      <Dropdown.Divider />
      <Dropdown.Item href="" onClick={() => copyDeck('text')}>
        Copy to Clipboard - Text
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => copyDeck('twd')}>
        Copy to Clipboard - TWD
      </Dropdown.Item>
      {!inMissing && (
        <>
          <Dropdown.Item href="" onClick={() => copyDeck('lackey')}>
            Copy to Clipboard - Lackey
          </Dropdown.Item>
          <Dropdown.Item href="" onClick={() => copyDeck('jol')}>
            Copy to Clipboard - JOL
          </Dropdown.Item>
        </>
      )}
      {!inMissing && username && decks && Object.keys(decks).length > 1 && (
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
          <Dropdown.Item href="" onClick={() => exportAll('jol')}>
            Save all decks - JOL
          </Dropdown.Item>
          {/* <Dropdown.Item href="" onClick={() => exportAll('xlsx')}> */}
          {/*   Save all decks - Excel */}
          {/* </Dropdown.Item> */}
          {/* <Dropdown.Item href="" onClick={() => exportAll('csv')}> */}
          {/*   Save all decks - CSV */}
          {/* </Dropdown.Item> */}
        </>
      )}
    </>
  );

  const copyDeck = (format) => {
    setError(false);
    setSpinnerState(true);

    const input = {
      deckid: deck.deckid,
      format: format,
      src: src,
    };

    if (input.deckid == 'deckInUrl') {
      const cards = {};
      Object.keys(deck.crypt).map((key) => {
        cards[key] = deck.crypt[key].q;
      });
      Object.keys(deck.library).map((key) => {
        cards[key] = deck.library[key].q;
      });

      input.deck = {
        cards: cards,
        name: deck.name,
        description: deck.description,
        author: deck.author,
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
        setSpinnerState(false);
        navigator.clipboard.writeText(data.deck);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
      })
      .catch((error) => {
        setSpinnerState(false);
        setError(true);
      });
  };

  const saveDeck = (format) => {
    setError(false);
    setSpinnerState(true);

    const input = {
      deckid: deck.deckid,
      format: format,
      src: src,
    };

    if (input.deckid == 'deckInUrl') {
      const cards = {};
      Object.keys(deck.crypt).map((key) => {
        cards[key] = deck.crypt[key].q;
      });
      Object.keys(deck.library).map((key) => {
        cards[key] = deck.library[key].q;
      });

      input.deck = {
        cards: cards,
        name: deck.name,
        description: deck.description,
        author: deck.author,
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

    if (format === 'xlsx' || format === 'csv') {
      fetchPromise
        .then((response) => response.text())
        .then((data) => {
          let mime = 'data:text/csv';
          let extension = 'csv';
          if (format === 'xlsx') {
            mime =
              'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            extension = 'xlsx';
          }
          const file = `${mime};base64,${data}`;
          saveAs(file, `${deck['name']}.${extension}`);
          setSpinnerState(false);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
        })
        .catch((error) => {
          setSpinnerState(false);
          setError(true);
        });
    } else {
      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          const file = new File(
            [data.deck],
            `${data.name} [${data.format}].txt`,
            { type: 'text/plain;charset=utf-8' }
          );
          saveAs(file);
          setSpinnerState(false);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
        })
        .catch((error) => {
          setSpinnerState(false);
          setError(true);
        });
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

    if (format === 'xlsx' || format === 'csv') {
      // TODO
    } else {
      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          import('jszip')
            .then((Jszip) => {
              const zip = new Jszip();
              const d = new Date();
              const date = `${d.getFullYear()}-${d.getMonth() < 9 ? 0 : ''}${
                d.getMonth() + 1
              }-${d.getDate() < 10 ? 0 : ''}${d.getDate()}`;
              data.map((d) => {
                zip
                  .folder(`Decks ${date} [${format}]`)
                  .file(`${d.name} [${d.format}].txt`, d.deck);
              });
              zip
                .generateAsync({ type: 'blob' })
                .then((blob) => saveAs(blob, `Decks ${date} [${format}].zip`));
              setSpinnerState(false);
            })
            .catch((error) => {
              setError(true);
              setSpinnerState(false);
            });
        });
    }
  };

  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        variant={inMissing ? 'primary' : 'secondary'}
        title={
          <div
            title="Export Deck"
            className="d-flex justify-content-center align-items-center"
          >
            <div className="d-flex pe-2">
              {spinnerState ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <Download />
              )}
            </div>
            Export {inMissing ? 'Missing' : 'Deck'}
          </div>
        }
      >
        {ButtonOptions}
      </DropdownButton>
      <ErrorOverlay show={error} target={ref.current} placement="left">
        ERROR
      </ErrorOverlay>
    </>
  );
};

export default DeckExportButton;
