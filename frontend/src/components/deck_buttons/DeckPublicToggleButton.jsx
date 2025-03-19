import { useState } from 'react';
import { useNavigate } from 'react-router';
import PeopleFill from '@icons/people-fill.svg?react';
import People from '@icons/people.svg?react';
import { ButtonIconed, DeckPublicToggleConfirmation, Spinner } from '@/components';
import { PUBLIC_CHILD, PUBLIC_PARENT } from '@/constants';
import { useApp } from '@/context';
import { deckServices } from '@/services';

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
