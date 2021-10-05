import React, { useContext } from 'react';
import { Stack, Button } from 'react-bootstrap';
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
    <Stack gap={1}>
      {username && (
        <DeckImport
          setShowInfo={props.setShowInfo}
          setShowButtons={props.setShowButtons}
        />
      )}
      {username && props.deck && (
        <DeckClone
          deck={props.deck}
          activeDeck={props.activeDeck}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.deck && (
        <DeckExport
          deck={props.deck}
          activeDeck={props.activeDeck}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.isAuthor && props.deck && (
        <DeckDelete deck={props.deck} setShowButtons={props.setShowButtons} />
      )}
      {props.isAuthor && props.deck && (
        <DeckBranchCreate
          deck={props.deck}
          activeDeck={props.activeDeck}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.isAuthor &&
        props.deck &&
        (props.deck.master ||
          (props.deck.branches && props.deck.branches.length > 0)) && (
          <DeckBranchDelete
            deck={props.deck}
            setShowButtons={props.setShowButtons}
          />
        )}
      {props.deck && (
        <DeckCopyUrl
          isAuthor={props.isAuthor}
          deck={props.deck}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.deck && (
        <DeckProxy
          deck={props.deck}
          missingCrypt={props.missingCrypt}
          missingLibrary={props.missingLibrary}
          setShowInfo={props.setShowInfo}
          setShowButtons={props.setShowButtons}
          setShowProxySelect={props.setShowProxySelect}
        />
      )}
      {props.deck && (
        <Button
          onClick={() => {
            isMobile && props.setShowButtons(false);
            props.setShowDraw(true);
          }}
          variant="secondary"
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className="pe-2">
              <Dice3 />
            </div>
            Draw Cards
          </div>
        </Button>
      )}
      {props.deck && inventoryMode && (
        <DeckMissing
          name={props.deck.name}
          missingCrypt={props.missingCrypt}
          missingLibrary={props.missingLibrary}
          setShowButtons={props.setShowButtons}
        />
      )}
    </Stack>
  );
}

export default DeckButtons;
