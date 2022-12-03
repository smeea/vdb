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
      <div className="flex justify-end sticky-selector pt-3 pb-2">
        {addMode && (
          <>
            <div className={isBranches ? 'w-75' : 'w-100'}>
              <DeckSelectMy
                handleSelect={handleSelect}
                deckid={deck?.deckid ?? null}
              />
            </div>
            {isBranches && (
              <div className="ps-1 w-25">
                <DeckBranchSelect deck={deck ?? null} />
              </div>
            )}
          </>
        )}
        {isDesktop && (
          <Button
            className="ms-1"
            title="Hide Deck Panel"
            variant="primary"
            onClick={() => toggleAddMode()}
          >
            <div className="flex justify-center items-center">
              <div className={`flex ${addMode ? '' : 'pe-2'}`}>
                {addMode ? <EyeSlashFill /> : <EyeFill />}
              </div>
              {addMode ? '' : 'Show Deck'}
            </div>
          </Button>
        )}
      </div>
      {deck && addMode && (
        <>
          <div className="pt-2">
            <DeckCrypt deck={deck} inSearch />
          </div>
          <div className="pt-2">
            <DeckLibrary deck={deck} inSearch />
          </div>
        </>
      )}
    </>
  );
};

export default DeckSelectorAndDisplay;
