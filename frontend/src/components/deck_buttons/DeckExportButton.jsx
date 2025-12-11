import { Menu } from "@headlessui/react";
import Download from "@icons/download.svg?react";
import { useSnapshot } from "valtio";
import { MenuButton, MenuItem, MenuItemDivider, MenuItems } from "@/components";
import {
  BRANCH_NAME,
  BRANCHES,
  CRYPT,
  DECKS,
  EN,
  HARD,
  ID,
  JOL,
  LACKEY,
  LIBRARY,
  LOGIC,
  MASTER,
  NAME,
  SOFT,
  SURPLUS,
  SURPLUS_USED,
  TEXT,
  TWD,
  TWD_HINTS,
  VALUE,
  WISHLIST,
  XLSX,
} from "@/constants";
import { deckStore, inventoryStore, useApp, usedStore } from "@/context";
import { deckServices } from "@/services";
import { deepClone, exportDeck, getHardTotal, getSoftMax } from "@/utils";

const ExportDropdown = ({ action, title, format }) => {
  const formats = {
    [TWD]: "TWD",
    [TWD_HINTS]: "TWD (w/ hints)",
    [TEXT]: "Text",
    [LACKEY]: "Lackey",
    [JOL]: "JOL",
    [XLSX]: "Excel",
  };

  return (
    <MenuItem onClick={() => action(format)}>
      {title} - {formats[format]}
    </MenuItem>
  );
};

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
  const decks = useSnapshot(deckStore)[DECKS];
  const { [CRYPT]: usedCrypt, [LIBRARY]: usedLibrary } = useSnapshot(usedStore);
  const { [WISHLIST]: wishlist } = useSnapshot(inventoryStore);

  const copyDeck = (format) => {
    const exportText = exportDeck(deck, format);
    navigator.clipboard.writeText(exportText);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const saveDeck = async (format) => {
    let deckName = deck[NAME];
    if (deck[BRANCH_NAME] && (deck[MASTER] || deck[BRANCHES].length > 0)) {
      deckName += ` [${deck[BRANCH_NAME]}]`;
    }
    let file;

    if (format === XLSX) {
      const d = deepClone(deck);
      if (inInventory) {
        Object.values({ ...d[CRYPT], ...d[LIBRARY] }).forEach((card) => {
          const usedTarget = card.c[ID] > 200000 ? usedCrypt : usedLibrary;
          const softUsedMax = getSoftMax(usedTarget[SOFT][card.c[ID]]);
          const hardUsedTotal = getHardTotal(usedTarget[HARD][card.c[ID]]);
          const wishlistLogic = wishlist?.[card.c[ID]]?.[LOGIC];
          const value = wishlist?.[card.c[ID]]?.[VALUE];
          const surplus = wishlistLogic
            ? wishlistLogic === SURPLUS_USED
              ? card.q - (softUsedMax + hardUsedTotal + (value || 0))
              : card.q - (value || 0)
            : card.q - (softUsedMax + hardUsedTotal);

          const target = card.c[ID] > 200000 ? d[CRYPT] : d[LIBRARY];
          target[card.c[ID]][WISHLIST] = {
            [VALUE]: value,
            [LOGIC]: wishlistLogic,
            [SURPLUS]: surplus,
          };
        });
      }

      const data = await deckServices.exportXlsx(d);
      file = new File([data], `${deckName}.xlsx`, {
        type: "application/octet-stream",
      });
    } else {
      let exportText = null;
      if ((format === TWD || format === TWD_HINTS) && lang !== EN) {
        const enCrypt = {};
        const enLibrary = {};
        Object.keys(deck[CRYPT]).forEach((cardid) => {
          enCrypt[cardid] = {
            ...deck[CRYPT][cardid],
            c: { ...deck[CRYPT][cardid].c, [NAME]: nativeCrypt[cardid][NAME] },
          };
        });
        Object.keys(deck[LIBRARY]).forEach((cardid) => {
          enLibrary[cardid] = {
            ...deck[LIBRARY][cardid],
            c: {
              ...deck[LIBRARY][cardid].c,
              [NAME]: nativeLibrary[cardid][NAME],
            },
          };
        });

        exportText = exportDeck({ ...deck, [CRYPT]: enCrypt, [LIBRARY]: enLibrary }, format);
      } else {
        exportText = exportDeck(deck, format);
      }

      file = new File([exportText], `${deckName} [${format}].txt`, {
        type: "text/plain;charset=utf-8",
      });
    }

    const { saveAs } = await import("file-saver");
    saveAs(file, name);

    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const exportAll = (format) => {
    deckServices.exportDecks(decks, format);
  };

  return (
    <Menu>
      <MenuButton
        title="Export"
        icon={<Download />}
        variant={inMissing || !isDesktop ? "primary" : "secondary"}
        text="Export"
      />
      <MenuItems>
        {inInventory ? (
          <>
            <ExportDropdown action={saveDeck} title="Save as File" format={TEXT} />
            <ExportDropdown action={saveDeck} title="Save as File" format={LACKEY} />
            <ExportDropdown action={saveDeck} title="Save as File" format={XLSX} />
            <MenuItemDivider />
            <ExportDropdown action={copyDeck} title="Clipboard" format={TEXT} />
            <ExportDropdown action={copyDeck} title="Clipboard" format={LACKEY} />
          </>
        ) : (
          <>
            <ExportDropdown action={saveDeck} title="Save as File" format={TEXT} />
            {!inMissing && (
              <>
                <ExportDropdown action={saveDeck} title="Save as File" format={TWD} />
                <ExportDropdown action={saveDeck} title="Save as File" format={TWD_HINTS} />
                <ExportDropdown action={saveDeck} title="Save as File" format={LACKEY} />
                <ExportDropdown action={saveDeck} title="Save as File" format={JOL} />
              </>
            )}
            <ExportDropdown action={saveDeck} title="Save as File" format={XLSX} />
            <MenuItemDivider />
            <ExportDropdown action={copyDeck} title="Clipboard" format={TEXT} />
            {!inMissing && (
              <>
                <ExportDropdown action={copyDeck} title="Clipboard" format={TWD} />
                <ExportDropdown action={copyDeck} title="Clipboard" format={TWD_HINTS} />
                <ExportDropdown action={copyDeck} title="Clipboard" format={LACKEY} />
                <ExportDropdown action={copyDeck} title="Clipboard" format={JOL} />
              </>
            )}
            {!inMissing && username && Object.keys(decks).length > 1 && (
              <>
                <MenuItemDivider />
                <ExportDropdown action={exportAll} title="Export all Decks" format={TEXT} />
                <ExportDropdown action={exportAll} title="Export all Decks" format={LACKEY} />
                <ExportDropdown action={exportAll} title="Export all Decks" format={JOL} />
                <ExportDropdown action={exportAll} title="Export all Decks" format={XLSX} />
              </>
            )}
          </>
        )}
      </MenuItems>
    </Menu>
  );
};

export default DeckExportButton;
