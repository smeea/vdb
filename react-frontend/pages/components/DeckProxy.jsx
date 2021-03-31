import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Spinner, Dropdown } from 'react-bootstrap';
import Printer from '../../assets/images/icons/printer.svg';

import DeckProxySelectModal from './DeckProxySelectModal.jsx';

function DeckProxy(props) {
  const [spinnerState, setSpinnerState] = useState(false);
  const [deckError, setDeckError] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(undefined);

  const ProxyButtonOptions = (
    <>
      <Dropdown.Item href="" onClick={() => proxyDeck()}>
        Full Deck
      </Dropdown.Item>
      {props.inventoryMode && (
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
      cards[key] = props.deck.crypt[key].q;
    });
    Object.keys(props.deck.library).map((key) => {
      cards[key] = props.deck.library[key].q;
    });
    proxyCards(cards);
  };

  const proxyMissing = () => {
    const cards = {};
    Object.keys(props.missingCrypt).map((key) => {
      cards[key] = props.missingCrypt[key].q;
    });
    Object.keys(props.missingLibrary).map((key) => {
      cards[key] = props.missingLibrary[key].q;
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
          props.isMobile && props.setShowButtons(false);
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
      <Dropdown>
        <Dropdown.Toggle className="btn-block" variant="outline-secondary">
          <Printer />
          <span className="pl-1">PDF Proxy</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {spinnerState && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
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
          showImage={props.showImage}
          setShowImage={props.setShowImage}
        />
      )}
    </>
  );
}

export default DeckProxy;
