import React, { useState } from 'react';
import {
  ButtonGroup,
  Spinner,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { countCards } from 'utils';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';

const DeckPublicButton = ({ deck, noText }) => {
  const {
    decks,
    setDecks,
    setActiveDeck,
    setSharedDeck,
    setShowMenuButtons,
    setShowFloatingButtons,
  } = useApp();
  const [showCreateOrDeleteConfirmation, setShowCreateOrDeleteConfirmation] =
    useState(false);
  const [showSyncConfirmation, setShowSyncConfirmation] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);

  const isChild = deck.public_parent ? true : false;
  const isPublished = deck.public_parent || deck.public_child ? true : false;

  const handleCreateOrDelete = () => {
    createOrDelete();
    if (isPublished && isChild) {
      setActiveDeck({ src: 'my', deckid: deck.public_parent });
    }
    setShowCreateOrDeleteConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const handleSync = () => {
    syncPublic();
    setShowSyncConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const handleSwitch = () => {
    setActiveDeck({
      src: isChild ? 'my' : 'shared',
      deckid: isChild ? deck.public_parent : deck.public_child,
    });
  };

  const createOrDelete = () => {
    const url = `${process.env.API_URL}pda/${deck.deckid}`;
    const options = {
      method: isPublished ? 'DELETE' : 'POST',
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
        setDecks((prevState) => ({
          ...prevState,
          [data.parent]: {
            ...prevState[data.parent],
            public_child: isPublished ? null : data.child,
          },
        }));
      });

    setSpinnerState(false);
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
        <Dropdown.Item onClick={() => setShowCreateOrDeleteConfirmation(true)}>
          {isPublished ? 'Remove from Public' : 'Make Public'}
        </Dropdown.Item>
      )}
    </>
  );

  const changes = null; // TODO: SHOW CHANGES FROM BASE

  const isTooManyCards =
    countCards(Object.values(deck.crypt)) > 35 ||
    countCards(Object.values(deck.library)) > 90;

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

      <ModalConfirmation
        show={showCreateOrDeleteConfirmation}
        handleConfirm={handleCreateOrDelete}
        handleCancel={() => setShowCreateOrDeleteConfirmation(false)}
        headerText={
          isPublished
            ? `Remove "${deck.name}" from Public Deck Archive?`
            : `Add "${deck.name}" to Public Deck Archive?`
        }
        mainText={
          isTooManyCards
            ? 'Public Deck cannot have more than 35 crypt and 90 library cards'
            : isPublished
            ? 'This will not remove the deck from your deck library, but will stop to show it in Public Deck Archive'
            : 'You can remove it from Public Deck Archive at any time'
        }
        buttonText={
          isTooManyCards ? null : isPublished ? 'Remove Public' : 'Make Public'
        }
      />
    </>
  );
};

export default DeckPublicButton;
