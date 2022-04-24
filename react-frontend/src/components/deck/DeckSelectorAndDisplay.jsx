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

const DeckSelectorAndDisplay = ({ deckData }) => {
  const { decks, isDesktop, addMode, toggleAddMode } = useApp();

  const deckId = deckData.deckid;

  const isBranches =
    deckData &&
    (deckData.master || (deckData.branches && deckData.branches.length > 0));

  return (
    <>
      {decks && Object.keys(decks).length > 0 && (
        <>
          <div className="d-flex justify-content-end sticky-selector pt-3 pb-2">
            {deckId && addMode && (
              <>
                <div className={isBranches ? 'w-75' : 'w-100'}>
                  <DeckSelectMy deckId={deckId} />
                </div>
                {isBranches && (
                  <div className="ps-1 w-25">
                    <DeckBranchSelect deckId={deckId} />
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
      )}
    </>
  );
};

export default DeckSelectorAndDisplay;
