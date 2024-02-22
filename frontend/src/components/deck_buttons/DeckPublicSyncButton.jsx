import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import PeopleFill from '@/assets/images/icons/people-fill.svg?react';
import {
  Spinner,
  ModalConfirmation,
  DeckPublicDiff,
  ButtonIconed,
} from '@/components';
import { useApp, deckStore } from '@/context';

const DeckPublicSyncButton = ({ deck }) => {
  const { isDesktop, setShowMenuButtons, setShowFloatingButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSync = () => {
    syncPublic();
    setShowConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
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
    setIsLoading(true);
    fetch(url, options)
      .then((response) => response.json())
      .then(() => {
        deckStore.deck.crypt = { ...decks[deck.publicParent].crypt };
        deckStore.deck.library = { ...decks[deck.publicParent].library };
      });
    setIsLoading(false);
  };

  return (
    <>
      <ButtonIconed
        variant={isDesktop ? 'secondary' : 'primary'}
        onClick={() => setShowConfirmation(true)}
        title="Sync Deck with Public Deck Archive"
        text="Sync Public Deck"
        icon={!isLoading ? <PeopleFill /> : <Spinner />}
      />
      {showConfirmation && (
        <ModalConfirmation
          size="xl"
          title={`Sync "${deck.name}" with Public Deck Archive?`}
          buttonText="Sync"
          handleConfirm={handleSync}
          handleCancel={handleCancel}
        >
          <div>
            <div className="font-bold text-fgSecondary  dark:text-fgSecondaryDark">
              Changes from currently published version:
            </div>
            <DeckPublicDiff deckTo={deck} deckFrom={decks[deck.publicParent]} />
          </div>
        </ModalConfirmation>
      )}
    </>
  );
};

export default DeckPublicSyncButton;
