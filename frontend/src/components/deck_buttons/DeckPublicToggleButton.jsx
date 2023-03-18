import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/assets/images/icons/three-dots.svg';
import People from '@/assets/images/icons/people.svg';
import PeopleFill from '@/assets/images/icons/people-fill.svg';
import { DeckPublicToggleConfirmation, ButtonIconed } from '@/components';
import { useApp, deckStore } from '@/context';

const DeckPublicToggleButton = ({ deck, inAdv }) => {
  const { isDesktop } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isPublished = !!(deck.publicParent || deck.publicChild);
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
        variant={inAdv || !isDesktop ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
        title={`${isPublished ? 'In' : 'Not in'} Public Deck Archive`}
        icon={
          !isLoading ? (
            inAdv && !isPublished ? (
              <People width="16" height="23" viewBox="0 0 16 18" />
            ) : (
              <PeopleFill width="16" height="23" viewBox="0 0 16 18" />
            )
          ) : (
            <Spinner />
          )
        }
        text={inAdv ? null : isPublished ? 'Remove from Public' : 'Make Public'}
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
