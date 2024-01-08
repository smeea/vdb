import React from 'react';
import { useSnapshot } from 'valtio';
import EyeFill from '@/assets/images/icons/eye-fill.svg?react';
import EyeSlashFill from '@/assets/images/icons/eye-slash-fill.svg?react';
import {
  DeckSelectMy,
  DeckBranchSelect,
  DeckCrypt,
  DeckLibrary,
  ButtonIconed,
  ErrorMessage,
  FlexGapped,
} from '@/components';
import { setDeck, deckStore, useApp } from '@/context';

const DeckSelectorAndDisplay = () => {
  const { playtestMode, isDesktop, addMode, toggleAddMode } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;

  const isBranches = deck
    ? deck.master || (deck.branches && deck.branches.length > 0)
    : null;

  const handleSelect = (e) => {
    setDeck(decks[e.value]);
  };

  return (
    <FlexGapped className="flex-col">
      <div className="sticky z-10 flex space-x-1 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[44px]">
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
          {playtestMode ||
          !(
            Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
            Object.keys(deck.library).some((cardid) => cardid > 110000)
          ) ? (
            <>
              <DeckCrypt deck={deck} inSearch />
              <DeckLibrary deck={deck} inSearch />
            </>
          ) : (
            <div className="flex">
              <ErrorMessage>CONTAINS PLAYTEST CARDS</ErrorMessage>
            </div>
          )}
        </>
      )}
    </FlexGapped>
  );
};

export default DeckSelectorAndDisplay;
