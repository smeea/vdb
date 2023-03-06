import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import { useSnapshot } from 'valtio';
import { Modal, Button, DeckProxyCrypt, DeckProxyLibrary } from '@/components';
import { useApp, usedStore, inventoryStore } from '@/context';
import { getHardTotal, getSoftMax } from '@/utils';

const DeckProxySelectModal = ({ deck, proxyCards, handleClose }) => {
  const { isMobile, inventoryMode } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;

  const [proxySelected, setProxySelected] = useImmer(() => {
    const cards = {};
    Object.keys(deck.crypt).map((cardid) => {
      cards[cardid] = {
        print: false,
        set: '',
        q: deck.crypt[cardid].q,
      };
    });
    Object.keys(deck.library).map((cardid) => {
      cards[cardid] = {
        print: false,
        set: '',
        q: deck.library[cardid].q,
      };
    });

    return cards;
  });

  const [toggleState, setToggleState] = useState(false);

  const handleToggleSelect = () => {
    setProxySelected((draft) => {
      Object.keys(draft).map((cardid) => {
        draft[cardid].print = !toggleState;
      });
    });

    setToggleState(!toggleState);
  };

  const handleToggleResolve = () => {
    const crypt = {};
    const library = {};

    Object.keys(deck.crypt)
      .filter((cardid) => deck.crypt[cardid].q > 0)
      .map((cardid) => {
        const softUsedMax = getSoftMax(usedCrypt.soft[cardid]);
        const hardUsedTotal = getHardTotal(usedCrypt.hard[cardid]);

        const inInventory = inventoryCrypt[cardid]?.q || 0;
        const inventoryMiss = softUsedMax + hardUsedTotal - inInventory;
        const miss = deck.inventoryType
          ? Math.min(inventoryMiss, deck.crypt[cardid].q)
          : inventoryMiss >= 0
          ? deck.crypt[cardid].q
          : deck.crypt[cardid].q + inventoryMiss;

        if (miss > 0) {
          crypt[cardid] = {
            print: true,
            q: miss,
          };
        }
      });

    Object.keys(deck.library)
      .filter((cardid) => deck.library[cardid].q > 0)
      .map((cardid) => {
        const softUsedMax = getSoftMax(usedLibrary.soft[cardid]);
        const hardUsedTotal = getHardTotal(usedLibrary.hard[cardid]);

        const inInventory = inventoryLibrary[cardid]?.q || 0;
        const inventoryMiss = softUsedMax + hardUsedTotal - inInventory;
        const miss = deck.inventoryType
          ? Math.min(inventoryMiss, deck.library[cardid].q)
          : inventoryMiss >= 0
          ? deck.library[cardid].q
          : deck.library[cardid].q + inventoryMiss;

        if (miss > 0) {
          library[cardid] = {
            print: true,
            q: miss,
          };
        }
      });

    setProxySelected({ ...proxySelected, ...crypt, ...library });
  };

  const handleProxySelector = (e) => {
    const { id, name } = e.target;
    setProxySelected((draft) => {
      draft[id][name] = !draft[id][name];
    });
  };

  const handleSetSelector = (e) => {
    const { id, value } = e;
    setProxySelected((draft) => {
      draft[id].set = value;
    });
  };

  const handleProxyCounter = (_, card, q) => {
    if (q >= 0) {
      setProxySelected((draft) => {
        draft[card.Id].q = q;
      });
    }
  };

  const handleGenerate = (format) => {
    const crypt = {};
    const library = {};
    Object.keys(proxySelected)
      .filter((cardid) => proxySelected[cardid].print)
      .map((cardid) => {
        if (proxySelected[cardid].q > 0) {
          const card = {
            c: cardid > 200000 ? deck.crypt[cardid].c : deck.library[cardid].c,
            q: proxySelected[cardid].q,
            set: proxySelected[cardid].set,
          };

          if (cardid > 200000) {
            crypt[cardid] = card;
          } else {
            library[cardid] = card;
          }
        }
      });

    proxyCards(crypt, library, format);
    handleClose();
  };

  return (
    <Modal
      handleClose={handleClose}
      size="xl"
      title="Create PDF with Card Proxies"
      noPadding={isMobile}
    >
      <div className="space-y-5">
        <div className="flex gap-5 max-md:flex-col">
          <div className="basis-full sm:basis-5/9">
            {deck.crypt && (
              <div
                className={
                  isMobile
                    ? null
                    : 'top-[22px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark'
                }
              >
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
            {deck.library && (
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
        <div className="flex gap-1 max-md:flex-col md:justify-end">
          <Button
            variant="primary"
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
            variant="primary"
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
            variant="primary"
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
            variant="primary"
            onClick={() =>
              handleGenerate({
                isWhite: true,
                isLetter: true,
              })
            }
          >
            Generate - White gaps (Letter)
          </Button>
          <Button variant="primary" onClick={handleToggleSelect}>
            Select / Deselect All
          </Button>
          {inventoryMode && (
            <Button variant="primary" onClick={handleToggleResolve}>
              Add Missing in Inventory
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeckProxySelectModal;
