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

const DeckProxyButton = ({
  deck,
  missingCrypt,
  missingLibrary,
  noText,
  inDiff,
}) => {
  const { lang, inventoryMode, setShowFloatingButtons, setShowMenuButtons } =
    useApp();

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
      <Dropdown.Item
        href=""
        onClick={() => {
          setShowSelectModal(true);
          setShowFloatingButtons(false);
        }}
      >
        Select Cards
      </Dropdown.Item>
    </>
  );

  const proxyDeck = () => {
    const cards = {};
    Object.keys(deck.crypt).map((key) => {
      if (deck.crypt[key].q > 0) {
        cards[key] = {
          q: deck.crypt[key].q,
        };
      }
    });
    Object.keys(deck.library).map((key) => {
      if (deck.library[key].q > 0) {
        cards[key] = {
          q: deck.library[key].q,
        };
      }
    });
    proxyCards(cards);
  };

  const proxyMissing = () => {
    const cards = {};
    Object.keys(missingCrypt).map((key) => {
      if (missingCrypt[key].q > 0) {
        cards[key] = {
          q: missingCrypt[key].q,
        };
      }
    });
    Object.keys(missingLibrary).map((key) => {
      if (missingLibrary[key].q > 0) {
        cards[key] = {
          q: missingLibrary[key].q,
        };
      }
    });
    proxyCards(cards);
  };

  const proxyCards = (cards) => {
    setDeckError(false);
    if (deck) {
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
          saveAs(file, `${deck['name']}.pdf`);
          setSpinnerState(false);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
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
      {inDiff ? (
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
          variant={noText ? 'primary' : 'secondary'}
          title={
            <div
              title="Proxy PDF"
              className="d-flex justify-content-center align-items-center"
            >
              <div className={`d-flex ${noText ? null : 'pe-2'}`}>
                {spinnerState ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <Printer
                    width={noText ? '18' : '18'}
                    height={noText ? '22' : '18'}
                    viewBox="0 0 18 16"
                  />
                )}
              </div>
              {!noText && 'PDF Proxy'}
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
          handleClose={() => {
            setShowSelectModal(false);
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          deck={deck}
          missingCrypt={missingCrypt}
          missingLibrary={missingLibrary}
          proxyCards={proxyCards}
        />
      )}
    </>
  );
};

export default DeckProxyButton;
