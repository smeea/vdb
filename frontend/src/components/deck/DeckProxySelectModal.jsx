import React, { useState, useEffect } from 'react';
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

  const [proxySelected, setProxySelected] = useState({});
  const [toggleState, setToggleState] = useState(false);

  useEffect(() => {
    const cards = {};
    Object.keys(deck.crypt).map((cardid) => {
      cards[cardid] = {
        print: false,
        c: deck.crypt[cardid].c,
        q: deck.crypt[cardid].q,
      };
    });
    Object.keys(deck.library).map((cardid) => {
      cards[cardid] = {
        print: false,
        c: deck.library[cardid].c,
        q: deck.library[cardid].q,
      };
    });

    setProxySelected(cards);
  }, [deck]);

  const handleToggleSelect = () => {
    const newState = proxySelected;
    if (toggleState) {
      Object.keys(newState).map((cardid) => {
        newState[cardid].print = false;
      });
    } else {
      Object.keys(newState).map((cardid) => {
        newState[cardid].print = true;
      });
    }
    setProxySelected(newState);
    setToggleState(!toggleState);
  };

  const handleToggleResolve = () => {
    const crypt = {};
    const library = {};

    Object.keys(deck.crypt).map((card) => {
      const softUsedMax = getSoftMax(usedCrypt.soft[card]);
      const hardUsedTotal = getHardTotal(usedCrypt.hard[card]);

      // TODO make it readable (see UsedPopover)
      let miss = softUsedMax + hardUsedTotal;
      if (!deck.inventoryType && deck.crypt[card].q > softUsedMax)
        miss += deck.crypt[card].q - softUsedMax;
      if (inventoryCrypt[card]) miss -= inventoryCrypt[card].q;

      if (miss > 0 && deck.crypt[card].q > 0) {
        crypt[card] = {
          print: true,
          q: miss > deck.crypt[card].q ? deck.crypt[card].q : miss,
        };
      }
    });

    Object.keys(deck.library).map((card) => {
      const softUsedMax = getSoftMax(usedLibrary.soft[card]);
      const hardUsedTotal = getHardTotal(usedLibrary.hard[card]);

      // TODO make it readable (see UsedPopover)
      let miss = softUsedMax + hardUsedTotal;
      if (!deck.inventoryType && deck.library[card].q > softUsedMax)
        miss += deck.library[card].q - softUsedMax;
      if (inventoryLibrary[card]) miss -= inventoryLibrary[card].q;

      if (miss > 0 && deck.library[card].q > 0) {
        library[card] = {
          print: true,
          q: miss > deck.library[card].q ? deck.library[card].q : miss,
        };
      }
    });

    setProxySelected({ ...proxySelected, ...crypt, ...library });
  };

  const handleProxySelector = (e) => {
    const { id, name } = e.target;
    const newState = proxySelected;
    newState[id][name] = !newState[id][name];
    setProxySelected((prevState) => ({
      ...prevState,
      [id]: newState[id],
    }));
  };

  const handleSetSelector = (e) => {
    const { id, value } = e;
    const newState = proxySelected;
    if (value) {
      newState[id].set = value;
    } else {
      delete newState[id].set;
    }
    setProxySelected((prevState) => ({
      ...prevState,
      [id]: newState[id],
    }));
  };

  const handleProxyCounter = (deckid, card, q) => {
    if (q >= 0) {
      const newState = proxySelected;
      newState[card.Id].q = q;
      setProxySelected((prevState) => ({
        ...prevState,
        [card.Id]: newState[card.Id],
      }));
    }
  };

  const handleGenerate = (isWhiteGaps) => {
    const crypt = {};
    const library = {};
    Object.keys(proxySelected)
      .filter((cardid) => {
        return proxySelected[cardid].print;
      })
      .map((cardid) => {
        if (proxySelected[cardid].q > 0) {
          const card = {
            c: proxySelected[cardid].c,
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

    proxyCards(crypt, library, isWhiteGaps);
    handleClose();
  };

  return (
    <Modal
      handleClose={() => handleClose()}
      dialogClassName={isMobile ? '' : 'modal-x-wide'}
      title="Create PDF with Card Proxies"
    >
      <div>
        <div className="flex flex-row">
          <div className="basis-full md:basis-7/12">
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
          <div className="basis-full md:basis-5/12">
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
        <div className="flex flex-row">
          <div className="flex justify-end">
            <div
              className={`flex ${
                isMobile ? 'flex-row space-y-2' : 'flex-col space-x-2'
              }`}
            >
              <Button variant="primary" onClick={() => handleGenerate(false)}>
                Generate - Gray gaps
              </Button>
              <Button variant="primary" onClick={() => handleGenerate(true)}>
                Generate - White gaps
              </Button>
              <Button variant="primary" onClick={() => handleToggleSelect()}>
                Select / Deselect All
              </Button>
              {inventoryMode && (
                <Button variant="primary" onClick={() => handleToggleResolve()}>
                  Add Missing in Inventory
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeckProxySelectModal;
