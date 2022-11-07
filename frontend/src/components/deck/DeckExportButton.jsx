import React, { useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import {
  Spinner,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from 'react-bootstrap';
import Download from 'assets/images/icons/download.svg';
import { ErrorOverlay } from 'components';
import { useDeckExport } from 'hooks';
import { useApp, deckStore } from 'context';

const DeckExportButton = ({ deck, inMissing, inInventory }) => {
  const {
    username,
    setShowFloatingButtons,
    setShowMenuButtons,
    nativeCrypt,
    nativeLibrary,
    lang,
  } = useApp();
  const decks = useSnapshot(deckStore).decks;

  const [spinnerState, setSpinnerState] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);

  const ExportDropdown = ({ action, format }) => {
    const formats = {
      twd: 'TWD',
      twdHints: 'TWD (w/ hints)',
      text: 'Text',
      lackey: 'Lackey',
      jol: 'JOL',
      xlsx: 'Excel',
    };

    const actions = {
      save: [saveDeck, 'Save as File'],
      copy: [copyDeck, 'Clipboard'],
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
    saveAs(file, name);
  };

  const exportXlsx = async (deck, deckName) => {
    let XLSX = await import('xlsx');
    const crypt = Object.values(deck.crypt).map((card) => {
      let name = card.c.Name;
      if (card.c.Adv && card.c.Adv[0]) name += ' (ADV)';
      if (card.c.New) name += ` (G${card.c.Group})`;

      return { Quantity: card.q, Card: name };
    });

    const library = Object.values(deck.library).map((card) => {
      return { Quantity: card.q, Card: card.c.Name };
    });

    const cryptSheet = XLSX.utils.json_to_sheet(crypt);
    const librarySheet = XLSX.utils.json_to_sheet(library);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, cryptSheet, 'Crypt');
    XLSX.utils.book_append_sheet(workbook, librarySheet, 'Library');
    XLSX.writeFile(workbook, `${deckName}.xlsx`, { compression: true });
  };

  const saveDeck = (format) => {
    setError(false);

    let deckName = deck.name;
    if (deck.branchName && (deck.master || deck.branches.length > 0)) {
      deckName += ` [${deck['branchName']}]`;
    }

    if (format === 'xlsx') {
      exportXlsx(deck, deckName);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
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

  const exportAll = async (format) => {
    setError(false);
    const Jszip = await import('jszip');
    const zip = new Jszip();
    const date = new Date().toISOString().substring(0, 10);

    if (format === 'xlsx') {
      setSpinnerState(true);
      const url = `${process.env.API_URL}decks/export`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const folder = zip.folder(`Decks ${date} [${format}]`);
      const fetchPromises = Object.keys(decks).map((deckid) => {
        let cards = {};
        Object.keys(decks[deckid].crypt).map((key) => {
          cards[key] = decks[deckid].crypt[key].q;
        });
        Object.keys(decks[deckid].library).map((key) => {
          cards[key] = decks[deckid].library[key].q;
        });
        options.body = JSON.stringify({
          cards: cards,
        });
        return fetch(url, options)
          .then((response) => response.text())
          .then((data) => {
            folder.file(`${decks[deckid].name}.${format}`, data, {
              base64: true,
            });
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          })
          .catch(() => {
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
            title={`Export ${inMissing ? 'Missing' : ''}`}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="d-flex pe-2">
              {spinnerState ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <Download />
              )}
            </div>
            Export {inMissing ? 'Missing' : ''}
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
