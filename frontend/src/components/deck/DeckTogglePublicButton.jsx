import React, { useState } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { ButtonIconed, ModalConfirmation } from 'components';
import { countCards } from 'utils';
import { useApp } from 'context';

const DeckTogglePublicButton = ({ deck, isDropdown }) => {
  const { setDecks } = useApp();

  const [spinnerState, setSpinnerState] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isPublished = deck.public_parent || deck.public_child ? true : false;

  const handleConfirmation = () => {
    createOrDelete();
    setShowConfirmation(false);
  };

  const createOrDelete = () => {
    const url = `${process.env.API_URL}pda/${
      isPublished ? deck.public_child : deck.deckid
    }`;
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
        setDecks((prevState) => {
          return {
            ...prevState,
            [data.parent]: {
              ...prevState[data.parent],
              public_child: isPublished ? null : data.child,
            },
          };
        });
      });

    setSpinnerState(false);
  };

  const isTooManyCards =
    countCards(Object.values(deck.crypt)) > 35 ||
    countCards(Object.values(deck.library)) > 90;

  return (
    <>
      {isDropdown ? (
        <Dropdown.Item onClick={() => setShowConfirmation(true)}>
          {isPublished ? 'Remove from Public' : 'Make Public'}
        </Dropdown.Item>
      ) : (
        <ButtonIconed
          variant={isPublished ? 'third' : 'primary'}
          onClick={() => setShowConfirmation(true)}
          title={`${isPublished ? 'In' : 'Not in'} Public Deck Archive`}
          icon={
            !spinnerState ? (
              <PeopleFill width="16" height="23" viewBox="0 0 16 18" />
            ) : (
              <Spinner animation="border" size="sm" />
            )
          }
        />
      )}

      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirmation}
        handleCancel={() => setShowConfirmation(false)}
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

export default DeckTogglePublicButton;
