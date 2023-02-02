import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/assets/images/icons/three-dots.svg';
import PeopleFill from '@/assets/images/icons/people-fill.svg';
import { DeckPublicToggleConfirmation, ButtonIconed } from '@/components';
import { deckStore } from '@/context';

const DeckPublicToggleButton = ({ deck }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isPublished = Boolean(deck.publicParent || deck.publicChild);
  const parentId = deck.publicParent ?? deck.deckid;

  const handleConfirmation = () => {
    createOrDelete();
    setShowConfirmation(false);
  };

  const createOrDelete = () => {
    const url = `${import.meta.env.VITE_API_URL}/pda/${deck.deckid}`;
    const options = {
      method: isPublished ? 'DELETE' : 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setIsLoading(true);
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        deckStore.decks[parentId].publicChild = isPublished
          ? null
          : data.deckid;

        navigate(`/decks/${isPublished ? deck.publicParent : data.deckid}`);
      });

    setIsLoading(false);
  };

  return (
    <>
      <ButtonIconed
        variant="secondary"
        onClick={() => setShowConfirmation(true)}
        title={`${isPublished ? 'In' : 'Not in'} Public Deck Archive`}
        icon={
          !isLoading ? (
            <PeopleFill width="16" height="23" viewBox="0 0 16 18" />
          ) : (
            <Spinner />
          )
        }
        text={isPublished ? 'Remove from Public' : 'Make Public'}
      />
      {showConfirmation && (
        <DeckPublicToggleConfirmation
          deck={deck}
          handleConfirmation={handleConfirmation}
          setShow={setShowConfirmation}
        />
      )}
    </>
  );
};

export default DeckPublicToggleButton;
