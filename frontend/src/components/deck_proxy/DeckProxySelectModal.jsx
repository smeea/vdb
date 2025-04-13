import { Button, DeckProxyCrypt, DeckProxyLibrary, FlexGapped, Modal } from "@/components";
import { CRYPT, HARD, ID, INVENTORY_TYPE, LIBRARY, PRINT, SET, SOFT } from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { pdfServices } from "@/services";
import { getHardTotal, getSoftMax } from "@/utils";
import { useState } from "react";
import { useImmer } from "use-immer";

const DeckProxySelectModal = ({ deck, setShow }) => {
  const {
    setShowMenuButtons,
    setShowFloatingButtons,
    isMobile,
    inventoryMode,
    cryptDeckSort,
    lang,
    showLegacyImage,
  } = useApp();

  const handleClose = () => {
    setShow(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const [proxySelected, setProxySelected] = useImmer(() => {
    const cards = {};
    Object.keys(deck[CRYPT]).forEach((cardid) => {
      cards[cardid] = {
        [PRINT]: false,
        [SET]: "",
        q: deck[CRYPT][cardid].q,
      };
    });
    Object.keys(deck[LIBRARY]).forEach((cardid) => {
      cards[cardid] = {
        [PRINT]: false,
        [SET]: "",
        q: deck[LIBRARY][cardid].q,
      };
    });

    return cards;
  });

  const [toggleState, setToggleState] = useState(false);

  const handleToggleSelect = () => {
    setProxySelected((draft) => {
      Object.keys(draft).forEach((cardid) => {
        draft[cardid][PRINT] = !toggleState;
      });
    });

    setToggleState(!toggleState);
  };

  const handleToggleResolve = () => {
    const crypt = {};
    const library = {};

    Object.keys(deck[CRYPT])
      .filter((cardid) => deck[CRYPT][cardid].q > 0)
      .forEach((cardid) => {
        const softUsedMax = getSoftMax(usedStore[CRYPT][SOFT][cardid]);
        const hardUsedTotal = getHardTotal(usedStore[CRYPT][HARD][cardid]);

        const inInventory = inventoryStore[CRYPT][cardid]?.q || 0;
        const inventoryMiss = softUsedMax + hardUsedTotal - inInventory;
        const miss = deck[INVENTORY_TYPE]
          ? Math.min(inventoryMiss, deck[CRYPT][cardid].q)
          : inventoryMiss >= 0
            ? deck[CRYPT][cardid].q
            : deck[CRYPT][cardid].q + inventoryMiss;

        if (miss > 0) {
          crypt[cardid] = {
            [PRINT]: true,
            q: miss,
          };
        }
      });

    Object.keys(deck[LIBRARY])
      .filter((cardid) => deck[LIBRARY][cardid].q > 0)
      .forEach((cardid) => {
        const softUsedMax = getSoftMax(usedStore[LIBRARY][SOFT][cardid]);
        const hardUsedTotal = getHardTotal(usedStore[LIBRARY][HARD][cardid]);

        const inInventory = inventoryStore[LIBRARY][cardid]?.q || 0;
        const inventoryMiss = softUsedMax + hardUsedTotal - inInventory;
        const miss = deck[INVENTORY_TYPE]
          ? Math.min(inventoryMiss, deck[LIBRARY][cardid].q)
          : inventoryMiss >= 0
            ? deck[LIBRARY][cardid].q
            : deck[LIBRARY][cardid].q + inventoryMiss;

        if (miss > 0) {
          library[cardid] = {
            [PRINT]: true,
            q: miss,
          };
        }
      });

    setProxySelected({ ...proxySelected, ...crypt, ...library });
  };

  const handleProxySelector = (e) => {
    const { value, name } = e.currentTarget;
    setProxySelected((draft) => {
      draft[value][name] = !draft[value][name];
    });
  };

  const handleSetSelector = (e) => {
    const { id, value } = e;
    setProxySelected((draft) => {
      draft[id][SET] = value;
    });
  };

  const handleProxyCounter = (_, card, q) => {
    if (q >= 0) {
      setProxySelected((draft) => {
        draft[card[ID]].q = q;
      });
    }
  };

  const handleGenerate = (format) => {
    const crypt = {};
    const library = {};
    Object.keys(proxySelected)
      .filter((cardid) => proxySelected[cardid][PRINT])
      .forEach((cardid) => {
        if (proxySelected[cardid].q > 0) {
          const card = {
            c: cardid > 200000 ? deck[CRYPT][cardid].c : deck[LIBRARY][cardid].c,
            q: proxySelected[cardid].q,
            set: proxySelected[cardid][SET],
          };

          if (cardid > 200000) {
            crypt[cardid] = card;
          } else {
            library[cardid] = card;
          }
        }
      });

    pdfServices.proxyCards(crypt, library, format, cryptDeckSort, lang, showLegacyImage);
    handleClose();
  };

  return (
    <Modal
      handleClose={handleClose}
      size="xl"
      title="Create PDF with Card Proxies"
      noPadding={isMobile}
    >
      <FlexGapped className="flex-col">
        <div className="flex gap-5 max-md:flex-col">
          <div className="basis-full sm:basis-5/9">
            {deck[CRYPT] && (
              <div className="sm:top-[22px] sm:z-10 sm:bg-bgPrimary sm:dark:bg-bgPrimaryDark">
                <DeckProxyCrypt
                  deck={deck}
                  handleProxySelector={handleProxySelector}
                  handleSetSelector={handleSetSelector}
                  handleProxyCounter={handleProxyCounter}
                  proxySelected={proxySelected}
                />
              </div>
            )}
          </div>
          <div className="basis-full sm:basis-4/9">
            {deck[LIBRARY] && (
              <DeckProxyLibrary
                deck={deck}
                handleProxySelector={handleProxySelector}
                handleSetSelector={handleSetSelector}
                handleProxyCounter={handleProxyCounter}
                proxySelected={proxySelected}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2 max-sm:flex-col max-sm:p-2 max-sm:pt-0">
          <Button
            onClick={() =>
              handleGenerate({
                isWhite: false,
                isLetter: false,
              })
            }
          >
            Generate - Gray gaps (A4)
          </Button>
          <Button
            onClick={() =>
              handleGenerate({
                isWhite: true,
                isLetter: false,
              })
            }
          >
            Generate - White gaps (A4)
          </Button>
          <Button
            onClick={() =>
              handleGenerate({
                isWhite: false,
                isLetter: true,
              })
            }
          >
            Generate - Gray gaps (Letter)
          </Button>
          <Button
            onClick={() =>
              handleGenerate({
                isWhite: true,
                isLetter: true,
              })
            }
          >
            Generate - White gaps (Letter)
          </Button>
          <Button onClick={handleToggleSelect}>Select / Deselect All</Button>
          {inventoryMode && <Button onClick={handleToggleResolve}>Add Missing in Inventory</Button>}
        </div>
      </FlexGapped>
    </Modal>
  );
};

export default DeckProxySelectModal;
