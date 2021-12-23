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

const DeckSelectorAndDisplay = ({ deckData, activeDeck }) => {
  const { decks, isDesktop, addMode, toggleAddMode } = useApp();

  const deckId = activeDeck.deckid;

  const isBranches =
    deckData &&
    (deckData.master || (deckData.branches && deckData.branches.length > 0));

  return (
    <>
      {decks && Object.keys(decks).length > 0 && (
        <div className="d-flex justify-content-end sticky-insearch pb-2">
          {deckId && addMode && (
            <>
              <div className={isBranches ? 'w-75' : 'w-100'}>
                <DeckSelectMy activeDeck={activeDeck} />
              </div>
              {isBranches && (
                <div className="ps-1 w-25">
                  <DeckBranchSelect activeDeck={activeDeck} />
                </div>
              )}
            </>
          )}
          {isDesktop && (
            <div className="d-flex ps-1">
              <Button
                title="Hide Deck Panel"
                variant="primary"
                onClick={() => toggleAddMode()}
              >
                {addMode ? <EyeSlashFill /> : <EyeFill />}
              </Button>
            </div>
          )}
        </div>
      )}
      {deckId && addMode && (
        <>
          <div className="pt-2">
            <DeckCrypt
              deckid={deckId}
              cards={deckData.crypt}
              isAuthor={true}
              inSearch={true}
            />
          </div>
          <div className="pt-4">
            <DeckLibrary
              deckid={deckId}
              cards={deckData.library}
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
