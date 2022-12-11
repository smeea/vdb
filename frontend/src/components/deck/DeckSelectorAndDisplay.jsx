import React from 'react';
import { useSnapshot } from 'valtio';
import { Button } from 'components';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import {
  DeckSelectMy,
  DeckBranchSelect,
  DeckCrypt,
  DeckLibrary,
} from 'components';
import { setDeck, deckStore, useApp } from 'context';

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
    <>
      <div className="sticky-selector flex justify-end  ">
        {addMode && (
          <>
            <div className={isBranches ? 'w-75' : 'w-full'}>
              <DeckSelectMy
                handleSelect={handleSelect}
                deckid={deck?.deckid ?? null}
              />
            </div>
            {isBranches && (
              <div className="w-25 ">
                <DeckBranchSelect deck={deck ?? null} />
              </div>
            )}
          </>
        )}
        {isDesktop && (
          <Button
            title="Hide Deck Panel"
            variant="primary"
            onClick={() => toggleAddMode()}
          >
            <div className="flex items-center justify-center">
              <div className={`flex ${addMode ? '' : ''}`}>
                {addMode ? <EyeSlashFill /> : <EyeFill />}
              </div>
              {addMode ? '' : 'Show Deck'}
            </div>
          </Button>
        )}
      </div>
      {deck && addMode && (
        <>
          <div>
            <DeckCrypt deck={deck} inSearch />
          </div>
          <div>
            <DeckLibrary deck={deck} inSearch />
          </div>
        </>
      )}
    </>
  );
};

export default DeckSelectorAndDisplay;
