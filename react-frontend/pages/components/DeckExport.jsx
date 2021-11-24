import React, { useState, useRef, useContext } from 'react';
import FileSaver from 'file-saver';
import { Spinner, Dropdown } from 'react-bootstrap';
import Download from '../../assets/images/icons/download.svg';
import BlockButton from './BlockButton.jsx';
import ErrorOverlay from './ErrorOverlay.jsx';
import AppContext from '../../context/AppContext';

function DeckExport(props) {
  const { username, isMobile } = useContext(AppContext);

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
      <Dropdown.Item href="" onClick={() => saveDeck('jol')}>
        Save as file - JOL
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => saveDeck('xlsx')}>
        Save as file - Excel
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => saveDeck('csv')}>
        Save as file - CSV
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
      <Dropdown.Item href="" onClick={() => copyDeck('jol')}>
        Copy to Clipboard - JOL
      </Dropdown.Item>
      {username && (
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
          setSpinnerState(false);
          navigator.clipboard.writeText(data.deck);
          isMobile && props.setShowButtons(false);
        })
        .catch((error) => {
          setSpinnerState(false);
          setError(true);
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
            saveAs(file, `${props.deck['name']}.${extension}`);
            setSpinnerState(false);
            isMobile && props.setShowButtons(false);
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
            FileSaver.saveAs(file);
            setSpinnerState(false);
            isMobile && props.setShowButtons(false);
          })
          .catch((error) => {
            setSpinnerState(false);
            setError(true);
          });
      }
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

    if (format === 'xlsx' || format === 'csv') {
      // TODO
    } else {
      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          import('jszip')
            .then((jszip) => {
              const zip = new jszip();
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
                .then((blob) =>
                  FileSaver.saveAs(blob, `Decks ${date} [${format}].zip`)
                );
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
      <Dropdown>
        <Dropdown.Toggle as={BlockButton} variant="secondary">
          <div className="d-flex justify-content-center align-items-center">
            <div className="pe-2">
              <Download />
            </div>
            Export Deck
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {spinnerState && <Spinner animation="border" size="sm" />}
          {ExportButtonOptions}
        </Dropdown.Menu>
      </Dropdown>
      <ErrorOverlay show={error} target={ref.current} placement="left">
        ERROR
      </ErrorOverlay>
    </>
  );
}

export default DeckExport;
