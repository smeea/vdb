import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { Modal, Button, Col, Stack } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { DeckProxyCrypt, DeckProxyLibrary } from 'components';
import { useApp, usedStore, inventoryStore } from 'context';

const DeckProxySelectModal = ({ deck, proxyCards, show, handleClose }) => {
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

  const handleToggleSelectButton = () => {
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

  const handleToggleResolveButton = () => {
    const crypt = {};
    const library = {};

    Object.keys(deck.crypt).map((card) => {
      let softUsedMax = 0;
      if (usedCrypt.soft[card]) {
        Object.keys(usedCrypt.soft[card]).map((id) => {
          if (softUsedMax < usedCrypt.soft[card][id]) {
            softUsedMax = usedCrypt.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedCrypt.hard[card]) {
        Object.keys(usedCrypt.hard[card]).map((id) => {
          hardUsedTotal += usedCrypt.hard[card][id];
        });
      }

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
      let softUsedMax = 0;
      if (usedLibrary.soft[card]) {
        Object.keys(usedLibrary.soft[card]).map((id) => {
          if (softUsedMax < usedLibrary.soft[card][id]) {
            softUsedMax = usedLibrary.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedLibrary.hard[card]) {
        Object.keys(usedLibrary.hard[card]).map((id) => {
          hardUsedTotal += usedLibrary.hard[card][id];
        });
      }

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

  const handleProxyCounter = (deckid, id, q) => {
    if (q >= 0) {
      const newState = proxySelected;
      newState[id].q = q;
      setProxySelected((prevState) => ({
        ...prevState,
        [id]: newState[id],
      }));
    }
  };

  const handleGenerateButton = (isWhiteGaps) => {
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
      show={show}
      onHide={() => handleClose()}
      animation={false}
      dialogClassName={isMobile ? 'm-0' : 'modal-x-wide'}
    >
      <Modal.Header
        className={
          isMobile
            ? 'no-border pt-2 pb-0 ps-2 pe-3'
            : 'no-border pt-3 pb-1 px-4'
        }
      >
        <h5>Create PDF with Card Proxies</h5>
        <Button variant="outline-secondary" onClick={() => handleClose()}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div>
          <div className="flex flex-row px-0 pe-lg-4">
            <div className="basis-full md:basis-7/12 px-0 px-lg-4 pb-md-0">
              {deck.crypt && (
                <div className={isMobile ? null : 'sticky-modal'}>
                  <DeckProxyCrypt
                    cards={deck.crypt}
                    handleProxySelector={handleProxySelector}
                    handleSetSelector={handleSetSelector}
                    handleProxyCounter={handleProxyCounter}
                    proxySelected={proxySelected}
                  />
                </div>
              )}
            </div>
            <div className="basis-full md:basis-5/12 px-0">
              {deck.library && (
                <DeckProxyLibrary
                  cards={deck.library}
                  handleProxySelector={handleProxySelector}
                  handleSetSelector={handleSetSelector}
                  handleProxyCounter={handleProxyCounter}
                  proxySelected={proxySelected}
                />
              )}
            </div>
          </div>
          <div className="flex flex-row px-0 pe-lg-4">
            <div className="flex justify-end p-2 px-md-0 py-md-4">
              <Stack direction={isMobile ? 'vertical' : 'horizontal'} gap={2}>
                <Button
                  variant="primary"
                  onClick={() => handleGenerateButton(false)}
                >
                  Generate - Gray gaps
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleGenerateButton(true)}
                >
                  Generate - White gaps
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleToggleSelectButton()}
                >
                  Select / Deselect All
                </Button>
                {inventoryMode && (
                  <Button
                    variant="primary"
                    onClick={() => handleToggleResolveButton()}
                  >
                    Add Missing in Inventory
                  </Button>
                )}
              </Stack>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeckProxySelectModal;
