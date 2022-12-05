import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import Spinner from 'assets/images/icons/three-dots.svg';
import {
  Modal,
  Button,
  DeckPublicDiff,
  DeckTogglePublicButton,
} from 'components';
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
            className="flex justify-center items-center"
          >
            <div className={`flex ${noText ? '' : 'pe-2'}`}>
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
      {showSyncConfirmation && (
        <Modal
          handleClose={() => setShowSyncConfirmation(false)}
          dialogClassName={isMobile ? 'm-0' : 'modal-x-wide'}
          title={`Sync &quot;${deck.name}&quot; with Public Deck Archive?`}
        >
          <div>
            <div className="font-bold text-blue pb-2">
              Changes from currently published version:
            </div>
            <DeckPublicDiff deckTo={deck} deckFrom={decks[deck.publicParent]} />
          </div>
          <div>
            <Button variant="danger" onClick={handleSync}>
              Sync
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowSyncConfirmation(false)}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeckPublicButton;
