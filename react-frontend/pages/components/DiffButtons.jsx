import React, { useContext } from 'react';
import { Stack } from 'react-bootstrap';
import DiffCopyUrl from './DiffCopyUrl.jsx';
import DeckProxy from './DeckProxy.jsx';
import DeckMissing from './DeckMissing.jsx';
import AppContext from '../../context/AppContext';

function DiffButtons(props) {
  const { inventoryMode, username, isMobile } = useContext(AppContext);

  return (
    <Stack gap={1}>
      {props.deck && (
        <DiffCopyUrl
          fromQuery={props.fromQuery}
          toQuery={props.toQuery}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.deck && (
        <DeckProxy
          deck={props.deck}
          missingCrypt={props.missingCrypt}
          missingLibrary={props.missingLibrary}
          setShowButtons={props.setShowButtons}
          setShowProxySelect={props.setShowProxySelect}
          inDiff={true}
        />
      )}
      {props.deck && (
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

export default DiffButtons;
