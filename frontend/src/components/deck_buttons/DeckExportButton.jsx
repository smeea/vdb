import React from 'react';
import { useSnapshot } from 'valtio';
import Download from '@/assets/images/icons/download.svg?react';
import { Menu } from '@headlessui/react';
import { MenuItems, MenuItem, MenuItemDivider, MenuButton } from '@/components';
import { useDeckExport } from '@/hooks';
import { useApp, deckStore } from '@/context';
import { deckServices } from '@/services';
import { TWD, TWD_HINTS, TEXT, LACKEY, JOL, XLSX, EN } from '@/utils/constants';

const SAVE = 'save';
const COPY = 'copy';
const EXPORT_ALL = 'exportAll';

const DeckExportButton = ({ deck, inMissing, inInventory }) => {
  const {
    username,
    setShowFloatingButtons,
    setShowMenuButtons,
    nativeCrypt,
    nativeLibrary,
    isDesktop,
    lang,
  } = useApp();
  const decks = useSnapshot(deckStore).decks;

  const ExportDropdown = ({ action, format }) => {
    const formats = {
      [TWD]: 'TWD',
      [TWD_HINTS]: 'TWD (w/ hints)',
      [TEXT]: 'Text',
      [LACKEY]: 'Lackey',
      [JOL]: 'JOL',
      [XLSX]: 'Excel',
    };

    const actions = {
      [SAVE]: [saveDeck, 'Save as File'],
      [COPY]: [copyDeck, 'Clipboard'],
      [EXPORT_ALL]: [exportAll, 'Export all Decks'],
    };

    return (
      <MenuItem onClick={() => actions[action][0](format)}>
        {actions[action][1]} - {formats[format]}
      </MenuItem>
    );
  };

  const copyDeck = (format) => {
    const exportText = useDeckExport(deck, format);
    navigator.clipboard.writeText(exportText);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const saveDeck = async (format) => {
    let deckName = deck.name;
    if (deck.branchName && (deck.master || deck.branches.length > 0)) {
      deckName += ` [${deck['branchName']}]`;
    }
    let file;

    if (format === XLSX) {
      const data = await deckServices.exportXlsx(deck);
      file = new File([data], `${deckName}.xlsx`, {
        type: 'application/octet-stream',
      });
    } else {
      let exportText = null;
      if ((format === TWD || format === TWD_HINTS) && lang !== EN) {
        const enCrypt = {};
        const enLibrary = {};
        Object.keys(deck.crypt).forEach((cardid) => {
          enCrypt[cardid] = {
            ...deck.crypt[cardid],
            c: { ...deck.crypt[cardid].c, Name: nativeCrypt[cardid].Name },
          };
        });
        Object.keys(deck.library).forEach((cardid) => {
          enLibrary[cardid] = {
            ...deck.library[cardid],
            c: { ...deck.library[cardid].c, Name: nativeLibrary[cardid].Name },
          };
        });

        exportText = useDeckExport({ ...deck, crypt: enCrypt, library: enLibrary }, format);
      } else {
        exportText = useDeckExport(deck, format);
      }

      file = new File([exportText], `${deckName} [${format}].txt`, {
        type: 'text/plain;charset=utf-8',
      });
    }

    let { saveAs } = await import('file-saver');
    saveAs(file, name);

    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const exportAll = (format) => {
    deckServices.exportDecks(decks, format);
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton
        title={`Export ${inMissing ? 'Missing' : ''}`}
        icon={<Download />}
        variant={inMissing || !isDesktop ? 'primary' : 'secondary'}
        text={`Export ${inMissing ? 'Missing' : ''}`}
      />
      <MenuItems>
        {inInventory ? (
          <>
            <ExportDropdown action={SAVE} format={TEXT} />
            <ExportDropdown action={SAVE} format={LACKEY} />
            <ExportDropdown action={SAVE} format={XLSX} />
            <MenuItemDivider />
            <ExportDropdown action={COPY} format={TEXT} />
            <ExportDropdown action={COPY} format={LACKEY} />
          </>
        ) : (
          <>
            <ExportDropdown action={SAVE} format={TEXT} />
            {!inMissing && (
              <>
                <ExportDropdown action={SAVE} format={TWD} />
                <ExportDropdown action={SAVE} format={TWD_HINTS} />
                <ExportDropdown action={SAVE} format={LACKEY} />
                <ExportDropdown action={SAVE} format={JOL} />
              </>
            )}
            <ExportDropdown action={SAVE} format={XLSX} />
            <MenuItemDivider />
            <ExportDropdown action={COPY} format={TEXT} />
            {!inMissing && (
              <>
                <ExportDropdown action={COPY} format={TWD} />
                <ExportDropdown action={COPY} format={TWD_HINTS} />
                <ExportDropdown action={COPY} format={LACKEY} />
                <ExportDropdown action={COPY} format={JOL} />
              </>
            )}
            {!inMissing && username && decks && Object.keys(decks).length > 1 && (
              <>
                <MenuItemDivider />
                <ExportDropdown action={EXPORT_ALL} format={TEXT} />
                <ExportDropdown action={EXPORT_ALL} format={LACKEY} />
                <ExportDropdown action={EXPORT_ALL} format={JOL} />
                <ExportDropdown action={EXPORT_ALL} format={XLSX} />
              </>
            )}
          </>
        )}
      </MenuItems>
    </Menu>
  );
};

export default DeckExportButton;
