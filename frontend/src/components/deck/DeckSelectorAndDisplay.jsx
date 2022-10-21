import React from 'react';
import { Button } from 'react-bootstrap';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import {
  DeckSelectMy,
  DeckBranchSelect,
  DeckCrypt,
  DeckLibrary,
} from 'components';
import { useApp } from 'context';

const DeckSelectorAndDisplay = () => {
  const { deck, decks, setDeck, isDesktop, addMode, toggleAddMode } = useApp();
  const isBranches = deck.master || (deck.branches && deck.branches.length > 0);

  const handleSelect = (e) => {
    setDeck(decks[e.value]);
  };

  return (
    <>
      <div className="d-flex justify-content-end sticky-selector pt-3 pb-2">
        {deck && addMode && (
          <>
            <div className={isBranches ? 'w-75' : 'w-100'}>
              <DeckSelectMy handleSelect={handleSelect} deckid={deck.deckid} />
            </div>
            {isBranches && (
              <div className="ps-1 w-25">
                <DeckBranchSelect deckid={deck.deckid} />
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
            <div className="d-flex justify-content-center align-items-center">
              <div className={`d-flex ${addMode ? '' : 'pe-2'}`}>
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
            <DeckCrypt
              deckid={deck.deckid}
              cards={deck.crypt}
              isAuthor={true}
              inSearch={true}
            />
          </div>
          <div className="pt-4">
            <DeckLibrary
              deckid={deck.deckid}
              cards={deck.library}
              isAuthor={true}
              inSearch={true}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DeckSelectorAndDisplay;
