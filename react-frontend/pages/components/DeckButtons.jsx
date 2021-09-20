import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import DeckClone from './DeckClone.jsx';
import DeckDelete from './DeckDelete.jsx';
import DeckCopyUrl from './DeckCopyUrl.jsx';
import DeckImport from './DeckImport.jsx';
import DeckExport from './DeckExport.jsx';
import DeckProxy from './DeckProxy.jsx';
import DeckMissing from './DeckMissing.jsx';
import DeckBranchCreate from './DeckBranchCreate.jsx';
import DeckBranchDelete from './DeckBranchDelete.jsx';
import AppContext from '../../context/AppContext';
import Dice3 from '../../assets/images/icons/dice-3-fill.svg';

function DeckButtons(props) {
  const { inventoryMode, username, isMobile } = useContext(AppContext);

  return (
    <>
      {username && (
        <div className="button-block">
          <DeckImport
            setShowInfo={props.setShowInfo}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {username && props.deck && (
        <div className="button-block">
          <DeckClone
            deck={props.deck}
            activeDeck={props.activeDeck}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.deck && (
        <div className="button-block">
          <DeckExport
            deck={props.deck}
            activeDeck={props.activeDeck}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.isAuthor && props.deck && (
        <div className="button-block">
          <DeckDelete deck={props.deck} setShowButtons={props.setShowButtons} />
        </div>
      )}
      {props.isAuthor && props.deck && (
        <div className="button-block">
          <DeckBranchCreate
            deck={props.deck}
            activeDeck={props.activeDeck}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.isAuthor &&
        props.deck &&
        (props.deck.master ||
          (props.deck.branches && props.deck.branches.length > 0)) && (
          <div className="button-block">
            <DeckBranchDelete
              deck={props.deck}
              setShowButtons={props.setShowButtons}
            />
          </div>
        )}
      {props.deck && (
        <div className="button-block">
          <DeckCopyUrl
            isAuthor={props.isAuthor}
            deck={props.deck}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.deck && (
        <div className="button-block">
          <DeckProxy
            deck={props.deck}
            missingCrypt={props.missingCrypt}
            missingLibrary={props.missingLibrary}
            setShowInfo={props.setShowInfo}
            setShowButtons={props.setShowButtons}
            setShowProxySelect={props.setShowProxySelect}
          />
        </div>
      )}
      {props.deck && (
        <div className="button-block">
          <Button
            onClick={() => {
              isMobile && props.setShowButtons(false);
              props.setShowDraw(true);
            }}
            variant="outline-secondary"
            block
          >
            <Dice3 /> Draw Cards
          </Button>
        </div>
      )}
      {props.deck && inventoryMode && (
        <div className="button-block">
          <DeckMissing
            name={props.deck.name}
            missingCrypt={props.missingCrypt}
            missingLibrary={props.missingLibrary}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
    </>
  );
}

export default DeckButtons;
