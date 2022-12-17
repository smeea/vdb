import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import Spinner from 'assets/images/icons/three-dots.svg';
import {
  MenuButton,
  Modal,
  Button,
  DeckPublicDiff,
  DeckTogglePublicButton,
} from 'components';
import { useApp, deckStore } from 'context';

const DeckPublicButton = ({ deck }) => {
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

  return (
    <>
      <Menu>
        <MenuButton
          variant="secondary"
          title="Public Deck Archive Actions"
          icon={!spinnerState ? <PeopleFill /> : <Spinner />}
          text="Public"
        />
        <Menu.Items>
          {isPublished && (
            <Menu.Item>
              <div onClick={() => handleSwitch(deck.deckid)}>
                {isChild ? 'Go to Main Deck' : 'Go to Public Deck'}
              </div>
            </Menu.Item>
          )}
          {isChild && (
            <Menu.Item>
              <div onClick={() => setShowSyncConfirmation(true)}>
                Sync Public Deck
              </div>
            </Menu.Item>
          )}
          {(isChild || !isPublished) && (
            <DeckTogglePublicButton deck={deck} isDropdown />
          )}
        </Menu.Items>
      </Menu>
      {showSyncConfirmation && (
        <Modal
          handleClose={() => setShowSyncConfirmation(false)}
          dialogClassName={isMobile ? 'm-0' : 'modal-x-wide'}
          title={`Sync &quot;${deck.name}&quot; with Public Deck Archive?`}
        >
          <div>
            <div className="text-blue  font-bold">
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
