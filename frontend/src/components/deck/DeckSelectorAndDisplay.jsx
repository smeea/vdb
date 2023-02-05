import React from 'react';
import { useSnapshot } from 'valtio';
import EyeFill from '@/assets/images/icons/eye-fill.svg';
import EyeSlashFill from '@/assets/images/icons/eye-slash-fill.svg';
import {
  DeckSelectMy,
  DeckBranchSelect,
  DeckCrypt,
  DeckLibrary,
  ButtonIconed,
} from '@/components';
import { setDeck, deckStore, useApp } from '@/context';

const DeckSelectorAndDisplay = () => {
  const { isDesktop, addMode, toggleAddMode } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;

  const isBranches = deck
    ? deck.master || (deck.branches && deck.branches.length > 0)
    : null;

  const handleSelect = (e) => {
    setDeck(decks[e.value]);
  };

  return (
    <div className="flex h-full flex-col sm:gap-4 lg:gap-6 xl:gap-8">
      <div className="sticky z-10 flex space-x-1 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[56px] lg:top-[64px] xl:top-[72px]">
        {addMode && (
          <>
            <div className={isBranches ? 'w-3/4' : 'w-full'}>
              <DeckSelectMy
                handleSelect={handleSelect}
                deckid={deck?.deckid ?? null}
              />
            </div>
            {isBranches && (
              <div className="w-1/4">
                <DeckBranchSelect deck={deck ?? null} />
              </div>
            )}
          </>
        )}
        {isDesktop && (
          <ButtonIconed
            title="Hide Deck Panel"
            variant="primary"
            onClick={toggleAddMode}
            icon={addMode ? <EyeSlashFill /> : <EyeFill />}
            text={addMode ? null : 'Show Deck'}
          />
        )}
      </div>
      {deck && addMode && (
        <>
          <DeckCrypt deck={deck} inSearch />
          <DeckLibrary deck={deck} inSearch />
        </>
      )}
    </div>
  );
};

export default DeckSelectorAndDisplay;
