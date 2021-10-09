import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import DeckProxyCrypt from './DeckProxyCrypt.jsx';
import DeckProxyLibrary from './DeckProxyLibrary.jsx';
import AppContext from '../../context/AppContext.js';

function DeckProxySelectModal(props) {
  const {
    usedCryptCards,
    usedLibraryCards,
    inventoryCrypt,
    inventoryLibrary,
    isMobile,
    inventoryMode,
  } = useContext(AppContext);

  const [proxySelected, setProxySelected] = useState({});
  const [toggleState, setToggleState] = useState(false);

  useEffect(() => {
    const cards = {};
    Object.keys(props.deck.crypt).map((key) => {
      cards[key] = {
        print: false,
        q: props.deck.crypt[key].q,
      };
    });
    Object.keys(props.deck.library).map((key) => {
      cards[key] = {
        print: false,
        q: props.deck.library[key].q,
      };
    });

    setProxySelected(cards);
  }, [props.deck]);

  const handleToggleSelectButton = () => {
    const newState = proxySelected;
    if (toggleState) {
      Object.keys(newState).map((key) => {
        newState[key].print = false;
      });
    } else {
      Object.keys(newState).map((key) => {
        newState[key].print = true;
      });
    }
    setProxySelected(newState);
    setToggleState(!toggleState);
  };

  const handleToggleResolveButton = () => {
    const crypt = {};
    const library = {};

    Object.keys(props.deck.crypt).map((card) => {
      let softUsedMax = 0;
      if (usedCryptCards.soft[card]) {
        Object.keys(usedCryptCards.soft[card]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card][id]) {
            softUsedMax = usedCryptCards.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedCryptCards.hard[card]) {
        Object.keys(usedCryptCards.hard[card]).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card][id];
        });
      }

      let miss = softUsedMax + hardUsedTotal;
      if (!props.deck.inventory_type && props.deck.crypt[card].q > softUsedMax)
        miss += props.deck.crypt[card].q - softUsedMax;
      if (inventoryCrypt[card]) miss -= inventoryCrypt[card].q;

      if (miss > 0 && props.deck.crypt[card].q > 0) {
        crypt[card] = {
          print: true,
          q: miss > props.deck.crypt[card].q ? props.deck.crypt[card].q : miss,
        };
      }
    });

    Object.keys(props.deck.library).map((card) => {
      let softUsedMax = 0;
      if (usedLibraryCards.soft[card]) {
        Object.keys(usedLibraryCards.soft[card]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card][id]) {
            softUsedMax = usedLibraryCards.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedLibraryCards.hard[card]) {
        Object.keys(usedLibraryCards.hard[card]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card][id];
        });
      }

      let miss = softUsedMax + hardUsedTotal;
      if (
        !props.deck.inventory_type &&
        props.deck.library[card].q > softUsedMax
      )
        miss += props.deck.library[card].q - softUsedMax;
      if (inventoryLibrary[card]) miss -= inventoryLibrary[card].q;

      if (miss > 0 && props.deck.library[card].q > 0) {
        library[card] = {
          print: true,
          q:
            miss > props.deck.library[card].q
              ? props.deck.library[card].q
              : miss,
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

  const handleProxyCounter = (deckid, id, q) => {
    const newState = proxySelected;
    newState[id].q = q;
    setProxySelected((prevState) => ({
      ...prevState,
      [id]: newState[id],
    }));
  };

  const handleGenerateButton = () => {
    const cards = {};
    Object.keys(proxySelected)
      .filter((key) => {
        return proxySelected[key].print;
      })
      .map((key) => {
        cards[key] = proxySelected[key].q;
      });
    props.proxyCards(cards);
    props.setShow(false);
    isMobile && props.setShowButtons(false);
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      animation={false}
      dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
    >
      <Modal.Header
        className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
      >
        <h5>Create PDF with Card Proxies</h5>
        <Button
          variant="outline-secondary"
          onClick={() => props.setShow(false)}
        >
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className="px-0">
            <Col xs={12} md={7} className="px-0 ps-lg-4 pe-lg-3">
              {props.deck.crypt && (
                <>
                  <div className={isMobile ? null : 'sticky-modal'}>
                    <DeckProxyCrypt
                      cards={props.deck.crypt}
                      handleProxySelector={handleProxySelector}
                      handleProxyCounter={handleProxyCounter}
                      proxySelected={proxySelected}
                    />
                  </div>
                  {!isMobile && <br />}
                </>
              )}
            </Col>
            <Col xs={12} md={5} className="px-0 ps-lg-3 pe-lg-4">
              {props.deck.library && (
                <>
                  <DeckProxyLibrary
                    cards={props.deck.library}
                    deckid={props.deck.deckid}
                    handleProxySelector={handleProxySelector}
                    handleProxyCounter={handleProxyCounter}
                    proxySelected={proxySelected}
                    inProxy={true}
                  />
                  {!isMobile && <br />}
                </>
              )}
            </Col>
          </Row>
          <div
            className={
              isMobile
                ? 'd-flex justify-content-end pt-2 py-2'
                : 'd-flex justify-content-end px-2 pb-4'
            }
          >
            <div className="ps-2">
              <Button variant="primary" onClick={handleGenerateButton}>
                Generate
              </Button>
            </div>
            <div className="ps-2">
              <Button
                variant="primary"
                onClick={() => handleToggleSelectButton()}
              >
                Select / Deselect All
              </Button>
            </div>
            {inventoryMode && (
              <div className="ps-2">
                <Button
                  variant="primary"
                  onClick={() => handleToggleResolveButton()}
                >
                  Add Missing in Inventory
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DeckProxySelectModal;
