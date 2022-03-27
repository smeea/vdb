import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import {
  Spinner,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import Printer from 'assets/images/icons/printer.svg';
import { DeckProxySelectModal } from 'components';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckProxyButton = (props) => {
  const { lang, inventoryMode, isMobile } = useApp();
  const [spinnerState, setSpinnerState] = useState(false);
  const [deckError, setDeckError] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(undefined);

  const ButtonOptions = (
    <>
      <Dropdown.Item href="" onClick={() => proxyDeck()}>
        Full Deck
      </Dropdown.Item>
      {inventoryMode && (
        <Dropdown.Item href="" onClick={() => proxyMissing()}>
          Missing in Inventory
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
      if (props.missingCrypt[key].q > 0) {
        cards[key] = {
          q: props.missingCrypt[key].q,
        };
      }
    });
    Object.keys(props.missingLibrary).map((key) => {
      if (props.missingLibrary[key].q > 0) {
        cards[key] = {
          q: props.missingLibrary[key].q,
        };
      }
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
          lang: lang,
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
      {props.inDiff ? (
        <ButtonIconed
          variant="secondary"
          onClick={() => proxyMissing()}
          title="Proxy Missing Cards to PDF ready for print"
          icon={<Printer />}
          text="Proxy Missing"
        />
      ) : (
        <DropdownButton
          as={ButtonGroup}
          variant={props.noText ? 'primary' : 'secondary'}
          title={
            <div
              title="Proxy PDF"
              className="d-flex justify-content-center align-items-center"
            >
              <div className={`d-flex ${props.noText ? null : 'pe-2'}`}>
                {spinnerState ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <Printer
                    width={props.noText ? '18' : '18'}
                    height={props.noText ? '22' : '18'}
                    viewBox="0 0 18 16"
                  />
                )}
              </div>
              {!props.noText && 'PDF Proxy'}
            </div>
          }
        >
          {ButtonOptions}
        </DropdownButton>
      )}
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
          missingCrypt={props.missingCrypt}
          missingLibrary={props.missingLibrary}
          proxyCards={proxyCards}
        />
      )}
    </>
  );
};

export default DeckProxyButton;
