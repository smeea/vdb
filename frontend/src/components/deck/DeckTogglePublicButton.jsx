import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Spinner } from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { ButtonIconed, ModalConfirmation } from 'components';
import { countCards } from 'utils';
import { deckStore } from 'context';

const DeckTogglePublicButton = ({ deck, isDropdown }) => {
  const navigate = useNavigate();
  const [spinnerState, setSpinnerState] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isPublished = Boolean(deck.publicParent || deck.publicChild);
  const parentId = deck.publicParent ?? deck.deckid;

  const handleConfirmation = () => {
    createOrDelete();
    setShowConfirmation(false);
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
        deckStore.decks[parentId].publicChild = isPublished
          ? null
          : data.deckid;

        navigate(`/decks/${isPublished ? deck.publicParent : data.deckid}`);
      });

    setSpinnerState(false);
  };

  const isTooManyCards =
    countCards(Object.values(deck.crypt)) > 35 ||
    countCards(Object.values(deck.library)) > 90;

  const withPlaytestCards =
    Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
    Object.keys(deck.library).some((cardid) => cardid > 110000);

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
            : withPlaytestCards
            ? 'Public Deck cannot have playtest cards'
            : isPublished
            ? 'This will not remove the deck from your deck library, but will stop to show it in Public Deck Archive'
            : 'You can remove it from Public Deck Archive at any time'
        }
        buttonText={
          isTooManyCards || withPlaytestCards
            ? null
            : isPublished
            ? 'Remove Public'
            : 'Make Public'
        }
      />
    </>
  );
};

export default DeckTogglePublicButton;
