import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import PeopleFill from '@/assets/images/icons/people-fill.svg';
import Spinner from '@/assets/images/icons/three-dots.svg';
import { Modal, Button, DeckPublicDiff, ButtonIconed } from '@/components';
import { useApp, deckStore } from '@/context';

const DeckPublicSyncButton = ({ deck }) => {
  const { setShowMenuButtons, setShowFloatingButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const [showSyncConfirmation, setShowSyncConfirmation] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);

  const handleSync = () => {
    syncPublic();
    setShowSyncConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const syncPublic = () => {
    const url = `${import.meta.env.VITE_API_URL}/pda/${deck.deckid}`;
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
      <ButtonIconed
        variant="secondary"
        onClick={() => setShowSyncConfirmation(true)}
        title="Sync Deck with Public Deck Archive"
        text="Sync Public Deck"
        icon={!spinnerState ? <PeopleFill /> : <Spinner />}
      />
      {showSyncConfirmation && (
        /* TODO refactor to ModalConfirmation */
        <Modal
          handleClose={() => setShowSyncConfirmation(false)}
          size="xl"
          title={`Sync "${deck.name}" with Public Deck Archive?`}
        >
          <div>
            <div className="font-bold text-fgSecondary  dark:text-fgSecondaryDark">
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

export default DeckPublicSyncButton;
