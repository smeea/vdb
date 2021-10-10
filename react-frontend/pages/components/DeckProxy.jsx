import React, { useState, useContext } from 'react';
import { saveAs } from 'file-saver';
import { Button, Spinner, Dropdown } from 'react-bootstrap';
import Printer from '../../assets/images/icons/printer.svg';
import DeckProxySelectModal from './DeckProxySelectModal.jsx';
import BlockButton from './BlockButton.jsx';
import AppContext from '../../context/AppContext.js';

function DeckProxy(props) {
  const { inventoryMode, isMobile } = useContext(AppContext);
  const [spinnerState, setSpinnerState] = useState(false);
  const [deckError, setDeckError] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(undefined);

  const ProxyButtonOptions = (
    <>
      <Dropdown.Item href="" onClick={() => proxyDeck()}>
        Full Deck
      </Dropdown.Item>
      {inventoryMode && (
        <Dropdown.Item href="" onClick={() => proxyMissing()}>
          Missing Cards
        </Dropdown.Item>
      )}
      <Dropdown.Item href="" onClick={() => setShowSelectModal(true)}>
        Select Cards
      </Dropdown.Item>
    </>
  );

  const proxyDeck = () => {
    const cards = {};
    Object.keys(props.deck.crypt).map((key) => {
      if (props.deck.crypt[key].q > 0) {
        cards[key] = {
          q: props.deck.crypt[key].q,
        };
      }
    });
    Object.keys(props.deck.library).map((key) => {
      if (props.deck.library[key].q > 0) {
        cards[key] = {
          q: props.deck.library[key].q,
        };
      }
    });
    proxyCards(cards);
  };

  const proxyMissing = () => {
    const cards = {};
    Object.keys(props.missingCrypt).map((key) => {
      cards[key] = {
        q: props.missingCrypt[key].q,
      };
    });
    Object.keys(props.missingLibrary).map((key) => {
      cards[key] = {
        q: props.missingLibrary[key].q,
      };
    });
    proxyCards(cards);
  };

  const proxyCards = (cards) => {
    setDeckError(false);
    if (props.deck) {
      setSpinnerState(true);

      const url = `${process.env.API_URL}decks/proxy`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cards: cards,
        }),
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.text())
        .then((data) => {
          const file = 'data:application/pdf;base64,' + data;
          saveAs(file, `${props.deck['name']}.pdf`);
          setSpinnerState(false);
          isMobile && props.setShowButtons(false);
        })
        .catch((error) => {
          setSpinnerState(false);
        });
    } else {
      setDeckError(true);
    }
  };

  return (
    <>
      <Dropdown className="d-inline">
        <Dropdown.Toggle
          as={props.noText ? Button : BlockButton}
          variant={props.noText ? 'primary' : 'secondary'}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className={props.noText ? null : 'pe-2'}>
              <Printer />
            </div>
            {!props.noText && 'PDF Proxy'}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {spinnerState && <Spinner as="span" animation="border" size="sm" />}
          {ProxyButtonOptions}
        </Dropdown.Menu>
      </Dropdown>
      {deckError && (
        <div className="d-flex justify-content-start">
          <span className="login-error">Select deck to proxy</span>
        </div>
      )}
      {showSelectModal && (
        <DeckProxySelectModal
          show={showSelectModal}
          setShow={setShowSelectModal}
          deck={props.deck}
          proxyCards={proxyCards}
        />
      )}
    </>
  );
}

export default DeckProxy;
