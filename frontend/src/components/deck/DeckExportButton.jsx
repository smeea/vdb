import React, { useState, useRef } from 'react';
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

const DeckExportButton = ({ deck, src, inMissing, inInventory }) => {
  const {
    username,
    decks,
    setShowFloatingButtons,
    setShowMenuButtons,
    nativeCrypt,
    nativeLibrary,
    lang,
  } = useApp();

  const [spinnerState, setSpinnerState] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);

  const ExportDropdown = ({ action, format }) => {
    const formats = {
      twd: 'TWD',
      twdHints: 'TWD (with hints)',
      text: 'Text',
      lackey: 'Lackey',
      jol: 'JOL',
      xlsx: 'Excel',
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

  const ButtonOptions = inInventory ? (
    <>
      <ExportDropdown action="save" format="text" />
      <ExportDropdown action="save" format="lackey" />
      <ExportDropdown action="save" format="xlsx" />
      <Dropdown.Divider />
      <ExportDropdown action="copy" format="text" />
      <ExportDropdown action="copy" format="lackey" />
    </>
  ) : (
    <>
      <ExportDropdown action="save" format="text" />
      {!inMissing && (
        <>
          <ExportDropdown action="save" format="twd" />
          <ExportDropdown action="save" format="twdHints" />
          <ExportDropdown action="save" format="lackey" />
          <ExportDropdown action="save" format="jol" />
        </>
      )}
      <ExportDropdown action="save" format="xlsx" />
      <Dropdown.Divider />

      <ExportDropdown action="copy" format="text" />
      {!inMissing && (
        <>
          <ExportDropdown action="copy" format="twd" />
          <ExportDropdown action="copy" format="twdHints" />
          <ExportDropdown action="copy" format="lackey" />
          <ExportDropdown action="copy" format="jol" />
        </>
      )}
      {!inMissing && username && decks && Object.keys(decks).length > 1 && (
        <>
          <Dropdown.Divider />
          <ExportDropdown action="exportAll" format="text" />
          <ExportDropdown action="exportAll" format="lackey" />
          <ExportDropdown action="exportAll" format="jol" />
          <ExportDropdown action="exportAll" format="xlsx" />
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

  const saveFile = async (file, name) => {
    let { saveAs } = await import('file-saver');
    saveAs(file, name)
  }

  const saveDeck = (format) => {
    setError(false);

    let deckName = deck.name;
    if (deck.branchName && (deck.master || deck.branches.length > 0)) {
      deckName += ` [${deck['branchName']}]`;
    }

    if (format === 'xlsx') {
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

      const url = `${process.env.API_URL}${
        inInventory ? 'inventory' : 'decks'
      }/export`;
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
          const mime =
            'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

          const file = `${mime};base64,${data}`;
          saveFile(file, `${deckName}.${format}`);
          setSpinnerState(false);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
        })
        .catch((error) => {
          setSpinnerState(false);
          setError(true);
        });
    } else {
      let exportText = null;
      if ((format === 'twd' || format === 'twdHints') && lang !== 'en-EN') {
        const enCrypt = {};
        const enLibrary = {};
        Object.keys(deck.crypt).map((cardid) => {
          enCrypt[cardid] = {
            ...deck.crypt[cardid],
            c: { ...deck.crypt[cardid].c, Name: nativeCrypt[cardid].Name },
          };
        });
        Object.keys(deck.library).map((cardid) => {
          enLibrary[cardid] = {
            ...deck.library[cardid],
            c: { ...deck.library[cardid].c, Name: nativeLibrary[cardid].Name },
          };
        });

        exportText = useDeckExport(
          { ...deck, crypt: enCrypt, library: enLibrary },
          format
        );
      } else {
        exportText = useDeckExport(deck, format);
      }

      const file = new File([exportText], `${deckName} [${format}].txt`, {
        type: 'text/plain;charset=utf-8',
      });
      saveFile(file);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }
  };

  const exportAll = async(format) => {
    setError(false);
    const Jszip = await import('jszip')
    const zip = new Jszip();
    const date = new Date().toISOString().substring(0, 10);

    if (format === 'xlsx') {
      setSpinnerState(true);

      const url = `${process.env.API_URL}${
          inInventory ? 'inventory' : 'decks'
        }/export`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: null,
      };

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
          .then((blob) => saveFile(blob, `Decks ${date} [${format}].zip`));
        setSpinnerState(false);
      });
    } else {
      Object.values(decks).map((deck) => {
        zip
          .folder(`Decks ${date} [${format}]`)
          .file(`${deck.name}.txt`, useDeckExport(deck, format));
      });

      zip
        .generateAsync({ type: 'blob' })
        .then((blob) => saveFile(blob, `Decks ${date} [${format}].zip`));
    }
  };

  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        variant={inMissing ? 'primary' : 'secondary'}
        title={
          <div
            title={`Export ${
              inMissing ? 'Missing' : inInventory ? 'Inventory' : 'Deck'
            }`}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="d-flex pe-2">
              {spinnerState ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <Download />
              )}
            </div>
            Export {inMissing ? 'Missing' : inInventory ? 'Inventory' : 'Deck'}
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
