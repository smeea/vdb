import React from 'react';
import { useSnapshot } from 'valtio';
import Download from 'assets/images/icons/download.svg';
import { Menu } from '@headlessui/react';
import { MenuItems, MenuItem, MenuButton } from 'components';
import { useDeckExport } from 'hooks';
import { useApp, deckStore } from 'context';
import { deckServices } from 'services';

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
      <MenuItem>
        <div onClick={() => actions[action][0](format)}>
          {actions[action][1]} - {formats[format]}
        </div>
      </MenuItem>
    );
  };

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

  const saveDeck = async (format) => {
    let deckName = deck.name;
    if (deck.branchName && (deck.master || deck.branches.length > 0)) {
      deckName += ` [${deck['branchName']}]`;
    }
    let file;

    if (format === 'xlsx') {
      const data = await deckServices.exportXlsx(deck);
      file = new File([data], `${deckName}.xlsx`, {
        type: 'application/octet-stream',
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

      file = new File([exportText], `${deckName} [${format}].txt`, {
        type: 'text/plain;charset=utf-8',
      });
    }

    saveFile(file);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const exportAll = (format) => {
    deckServices.exportDecks(decks, format);
  };

  return (
    <Menu>
      <MenuButton
        title={`Export ${inMissing ? 'Missing' : ''}`}
        icon={<Download />}
        variant={inMissing ? 'primary' : 'secondary'}
        text={`Export ${inMissing ? 'Missing' : ''}`}
      />
      <MenuItems>
        {inInventory ? (
          <>
            <ExportDropdown action="save" format="text" />
            <ExportDropdown action="save" format="lackey" />
            <ExportDropdown action="save" format="xlsx" />
            {/* <Dropdown.Divider /> */}
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
            {/* <Dropdown.Divider /> */}
            <ExportDropdown action="copy" format="text" />
            {!inMissing && (
              <>
                <ExportDropdown action="copy" format="twd" />
                <ExportDropdown action="copy" format="twdHints" />
                <ExportDropdown action="copy" format="lackey" />
                <ExportDropdown action="copy" format="jol" />
              </>
            )}
            {!inMissing &&
              username &&
              decks &&
              Object.keys(decks).length > 1 && (
                <>
                  {/* <Dropdown.Divider /> */}
                  <ExportDropdown action="exportAll" format="text" />
                  <ExportDropdown action="exportAll" format="lackey" />
                  <ExportDropdown action="exportAll" format="jol" />
                  <ExportDropdown action="exportAll" format="xlsx" />
                </>
              )}
          </>
        )}
      </MenuItems>
    </Menu>
  );
};

export default DeckExportButton;
