import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import PeopleFill from '@/assets/images/icons/people-fill.svg?react';
import { Spinner, ModalConfirmation, DeckPublicDiff, ButtonIconed } from '@/components';
import { deckServices } from '@/services';
import { useApp, deckStore } from '@/context';
import { DECKS } from '@/constants';

const DeckPublicSyncButton = ({ deck }) => {
  const { isDesktop } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    deckServices.publicSync(deck, decks).then(() => {
      setIsLoading(false);
      setShowConfirmation(false);
    });
  };

  return (
    <>
      <ButtonIconed
        variant={isDesktop ? 'secondary' : 'primary'}
        onClick={() => setShowConfirmation(true)}
        title="Sync Deck with Public Deck Archive"
        text="Sync Public Deck"
        icon={isLoading ? <Spinner /> : <PeopleFill />}
      />
      {showConfirmation && (
        <ModalConfirmation
          size="xl"
          title={`Sync "${deck[NAME]}" with Public Deck Archive?`}
          buttonText="Sync"
          handleConfirm={handleClick}
          handleCancel={() => setShowConfirmation(false)}
        >
          <div>
            <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
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
