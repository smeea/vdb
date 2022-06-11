import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckTogglePublicButton = ({ deck }) => {
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

  return (
    <>
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
          isPublished
            ? 'This will not remove the deck from your deck library, but will stop to show it in Public Deck Archive'
            : 'You can remove it from Public Deck Archive at any time'
        }
        buttonText={`${isPublished ? 'Remove' : 'Make'} Public`}
      />
    </>
  );
};

export default DeckTogglePublicButton;
