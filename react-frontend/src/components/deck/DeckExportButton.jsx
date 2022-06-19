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
import { useDeckExport } from 'hooks';
import { useApp } from 'context';

const DeckExportButton = ({ deck, src, inMissing }) => {
  const { username, decks, setShowFloatingButtons, setShowMenuButtons } =
    useApp();

  const [spinnerState, setSpinnerState] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);

  const ExportDropdown = ({ action, format }) => {
    const formats = {
      twd: 'TWD',
      text: 'Text',
      lackey: 'Lackey',
      jol: 'JOL',
      xlsx: 'Excel',
      csv: 'CSV',
    };

    const actions = {
      save: [saveDeck, 'Save as File'],
      copy: [copyDeck, 'Copy to Clipboard'],
      exportAll: [exportAll, 'Export all Decks'],
    };

    return (
      <Dropdown.Item href="" onClick={() => actions[action][0](format)}>
        {actions[action][1]} - {formats[format]}
      </Dropdown.Item>
    );
  };

  const ButtonOptions = (
    <>
      <ExportDropdown action="save" format="text" />
      {!inMissing && (
        <>
          <ExportDropdown action="save" format="twd" />
          <ExportDropdown action="save" format="lackey" />
          <ExportDropdown action="save" format="jol" />
        </>
      )}
      <ExportDropdown action="save" format="xlsx" />
      {!inMissing && <ExportDropdown action="save" format="csv" />}
      <Dropdown.Divider />

      <ExportDropdown action="copy" format="text" />
      {!inMissing && (
        <>
          <ExportDropdown action="copy" format="twd" />
          <ExportDropdown action="copy" format="lackey" />
          <ExportDropdown action="copy" format="jol" />
        </>
      )}
      {!inMissing && username && decks && Object.keys(decks).length > 1 && (
        <>
          <Dropdown.Divider />
          <ExportDropdown action="exportAll" format="text" />
          <ExportDropdown action="exportAll" format="twd" />
          <ExportDropdown action="exportAll" format="lackey" />
          <ExportDropdown action="exportAll" format="jol" />
          <ExportDropdown action="exportAll" format="xlsx" />
          <ExportDropdown action="exportAll" format="csv" />
        </>
      )}
    </>
  );

  const copyDeck = (format) => {
    const exportText = useDeckExport(deck, format);
    navigator.clipboard.writeText(exportText);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const saveDeck = (format) => {
    setError(false);

    let deckName = deck.name;
    if (deck.branchName) {
      deckName += ` [${deck['branchName']}]`;
    }

    if (format === 'xlsx' || format === 'csv') {
      setSpinnerState(true);

      const input = {
        deckid: deck.deckid,
        format: format,
        src: src,
      };

      if (input.deckid === 'deckInUrl' || inMissing) {
        const cards = {};
        Object.keys(deck.crypt).map((key) => {
          cards[key] = deck.crypt[key].q;
        });
        Object.keys(deck.library).map((key) => {
          cards[key] = deck.library[key].q;
        });

        input.deck = {
          cards: cards,
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

      fetch(url, options)
        .then((response) => response.text())
        .then((data) => {
          let mime = 'data:text/csv';
          if (format === 'xlsx') {
            mime =
              'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          }

          const file = `${mime};base64,${data}`;
          saveAs(file, `${deckName}.${format}`);
          setSpinnerState(false);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
        })
        .catch((error) => {
          setSpinnerState(false);
          setError(true);
        });
    } else {
      const exportText = useDeckExport(deck, format);

      const file = new File([exportText], `${deckName} [${format}].txt`, {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(file);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }
  };

  const exportAll = (format) => {
    setError(false);
    import('jszip').then((Jszip) => {
      if (format === 'xlsx' || format === 'csv') {
        setSpinnerState(true);

        const url = `${process.env.API_URL}decks/export`;
        const options = {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: null,
        };

        const zip = new Jszip();
        const date = new Date().toISOString().substring(0, 10);

        const folder = zip.folder(`Decks ${date} [${format}]`);

        const fetchPromises = Object.keys(decks).map((deckid) => {
          options.body = JSON.stringify({
            deckid: deckid,
            format: format,
            src: 'my',
          });

          return fetch(url, options)
            .then((response) => response.text())
            .then((data) => {
              folder.file(`${decks[deckid].name}.${format}`, data, {
                base64: true,
              });

              setSpinnerState(false);
              setShowMenuButtons(false);
              setShowFloatingButtons(true);
            })
            .catch((error) => {
              setSpinnerState(false);
              setError(true);
            });
        });

        Promise.all(fetchPromises).then(() => {
          zip
            .generateAsync({ type: 'blob' })
            .then((blob) => saveAs(blob, `Decks ${date} [${format}].zip`));
          setSpinnerState(false);
        });
      } else {
        const zip = new Jszip();
        const date = new Date().toISOString().substring(0, 10);

        Object.values(decks).map((deck) => {
          zip
            .folder(`Decks ${date} [${format}]`)
            .file(`${deck.name}.txt`, useDeckExport(deck, format));
        });

        zip
          .generateAsync({ type: 'blob' })
          .then((blob) => saveAs(blob, `Decks ${date} [${format}].zip`));
      }
    });
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
