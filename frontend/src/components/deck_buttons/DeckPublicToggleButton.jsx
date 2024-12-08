import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import People from '@icons/people.svg?react';
import PeopleFill from '@icons/people-fill.svg?react';
import { Spinner, DeckPublicToggleConfirmation, ButtonIconed } from '@/components';
import { deckServices } from '@/services';
import { useApp } from '@/context';
import { PUBLIC_PARENT, PUBLIC_CHILD } from '@/constants';

const DeckPublicToggleButton = ({ deck, inAdv }) => {
  const { isDesktop, setShowMenuButtons, setShowFloatingButtons } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isPublished = !!(deck[PUBLIC_PARENT] || deck[PUBLIC_CHILD]);

  const handleClick = () => {
    setIsLoading(true);
    deckServices
      .publicCreateOrDelete(deck)
      .then((deckid) => {
        if (!inAdv) navigate(`/decks/${isPublished ? deck[PUBLIC_PARENT] : deckid}`);
      })
      .finally(() => {
        setIsLoading(false);
        setShowConfirmation(false);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
      });
  };

  return (
    <>
      <ButtonIconed
        variant={inAdv || !isDesktop ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
        title={`${isPublished ? 'In' : 'Not in'} Public Deck Archive`}
        icon={
          !isLoading ? (
            (inAdv && !isPublished) || (!inAdv && isPublished) ? (
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
          handleConfirmation={handleClick}
          setShow={setShowConfirmation}
        />
      )}
    </>
  );
};

export default DeckPublicToggleButton;
