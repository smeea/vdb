import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import {
  ButtonGroup,
  Spinner,
  Dropdown,
  DropdownButton,
  Modal,
  Button,
} from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { DeckPublicDiff, DeckTogglePublicButton } from 'components';
import { useApp, deckStore } from 'context';

const DeckPublicButton = ({ deck, noText }) => {
  const { isMobile, setShowMenuButtons, setShowFloatingButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const navigate = useNavigate();
  const [showSyncConfirmation, setShowSyncConfirmation] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);

  const isChild = Boolean(deck.publicParent);
  const isPublished = Boolean(deck.publicParent || deck.publicChild);

  const handleSync = () => {
    syncPublic();
    setShowSyncConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const handleSwitch = () => {
    navigate(`/decks/${isChild ? deck.publicParent : deck.publicChild}`);
  };

  const syncPublic = () => {
    const url = `${process.env.API_URL}pda/${deck.deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setSpinnerState(true);
    fetch(url, options)
      .then((response) => response.json())
      .then(() => {
        deckStore.deck.crypt = { ...decks[deck.publicParent].crypt };
        deckStore.deck.library = { ...decks[deck.publicParent].library };
      });
    setSpinnerState(false);
  };

  const ButtonOptions = (
    <>
      {isPublished && (
        <Dropdown.Item onClick={() => handleSwitch(deck.deckid)}>
          {isChild ? 'Go to Main Deck' : 'Go to Public Deck'}
        </Dropdown.Item>
      )}

      {isChild && (
        <Dropdown.Item onClick={() => setShowSyncConfirmation(true)}>
          Sync Public Deck
        </Dropdown.Item>
      )}

      {(isChild || !isPublished) && (
        <DeckTogglePublicButton deck={deck} isDropdown />
      )}
    </>
  );

  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        variant="secondary"
        title={
          <div
            title="Public Deck Archive Actions"
            className="d-flex justify-content-center align-items-center"
          >
            <div className={`d-flex ${noText ? '' : 'pe-2'}`}>
              {!spinnerState ? (
                <PeopleFill />
              ) : (
                <Spinner animation="border" size="sm" />
              )}
            </div>
            Public
          </div>
        }
      >
        {ButtonOptions}
      </DropdownButton>

      <Modal
        show={showSyncConfirmation}
        onHide={() => setShowSyncConfirmation(false)}
        animation={false}
        dialogClassName={isMobile ? 'm-0' : 'modal-x-wide'}
      >
        <Modal.Header
          className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
        >
          <h5>Sync "{deck.name}" with Public Deck Archive?</h5>
          <Button
            variant="outline-secondary"
            onClick={() => setShowSyncConfirmation(false)}
          >
            <X width="32" height="32" viewBox="0 0 16 16" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="bold blue pb-2">
            Changes from currently published version:
          </div>
          <DeckPublicDiff deckTo={deck} deckFrom={decks[deck.publicParent]} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleSync}>
            Sync
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowSyncConfirmation(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeckPublicButton;
