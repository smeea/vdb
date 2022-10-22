import React, { useState } from 'react';
import {
  ButtonGroup,
  Spinner,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { ModalConfirmation, DeckTogglePublicButton } from 'components';
import { useApp } from 'context';

const DeckPublicButton = ({ deck, noText }) => {
  const {
    decks,
    setActiveDeck,
    setSharedDeck,
    setShowMenuButtons,
    setShowFloatingButtons,
  } = useApp();
  const [showSyncConfirmation, setShowSyncConfirmation] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);

  const isChild = Boolean(deck.publicParent);
  const isPublished = Boolean(deck.publicParent || deck.publicChild);

  const handleSync = () => {
    syncPublic();
    setShowSyncConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const handleSwitch = () => {
    setActiveDeck({
      src: isChild ? 'my' : 'shared',
      deckid: isChild ? deck.publicParent : deck.publicChild,
    });
  };

  const syncPublic = () => {
    const url = `${process.env.API_URL}pda/${deck.deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setSpinnerState(true);
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setSharedDeck((prevState) => ({
          ...prevState,
          [data.child]: {
            ...prevState[data.child],
            crypt: { ...decks[data.parent].crypt },
            library: { ...decks[data.parent].library },
          },
        }));
      });
    setSpinnerState(false);
  };

  const ButtonOptions = (
    <>
      {isPublished && (
        <Dropdown.Item onClick={() => handleSwitch(deck.deckid)}>
          {isChild ? 'Go to Main Deck' : 'Go to Public Deck'}
        </Dropdown.Item>
      )}

      {isChild && (
        <Dropdown.Item onClick={() => setShowSyncConfirmation(true)}>
          Sync Public Deck
        </Dropdown.Item>
      )}

      {(isChild || !isPublished) && (
        <DeckTogglePublicButton deck={deck} isDropdown />
      )}
    </>
  );

  const changes = null; // TODO: SHOW CHANGES FROM BASE

  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        variant="secondary"
        title={
          <div
            title="Public Deck Archive Actions"
            className="d-flex justify-content-center align-items-center"
          >
            <div className={`d-flex ${noText ? '' : 'pe-2'}`}>
              {!spinnerState ? (
                <PeopleFill />
              ) : (
                <Spinner animation="border" size="sm" />
              )}
            </div>
            Public Archive
          </div>
        }
      >
        {ButtonOptions}
      </DropdownButton>

      <ModalConfirmation
        show={showSyncConfirmation}
        handleConfirm={handleSync}
        handleCancel={() => setShowSyncConfirmation(false)}
        headerText={`Sync "${deck.name}" with Public Deck Archive?`}
        mainText={changes}
        buttonText="Sync"
      />
    </>
  );
};

export default DeckPublicButton;
