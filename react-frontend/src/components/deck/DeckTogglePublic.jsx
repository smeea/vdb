import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import ShareFill from 'assets/images/icons/share-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';

function DeckTogglePublic(props) {
  const { setActiveDeck, setDecks, isMobile } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    togglePublic();
    setShowConfirmation(false);
    isMobile && props.setShowButtons(false);
  };

  const isPublished =
    props.deck.public_parent || props.deck.public_child ? true : false;
  const isChild = props.deck.public_parent ? true : false;
  const parent = isChild ? props.deck.public_parent : props.deck.deckid;

  const togglePublic = () => {
    // Accept deckid of main (parent) deck and public (child), handled on backend
    const url = `${process.env.API_URL}pda/${props.deck.deckid}`;
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
        setSpinnerState(false);
        setDecks((prevState) => {
          return {
            ...prevState,
            [parent]: {
              ...prevState[parent],
              public_child: isPublished ? null : data.child,
            },
          };
        });
        if (isPublished && isChild)
          setActiveDeck({ src: 'shared', deckid: parent });
      })
      .catch((error) => {
        setSpinnerState(false);
      });

    isMobile && props.setShowInfo(true);
  };

  return (
    <>
      <Button
        title="Toggle Public/Private Deck"
        variant={
          props.noText ? (isPublished ? 'third' : 'primary') : 'secondary'
        }
        onClick={() => setShowConfirmation(true)}
      >
        <div className="d-flex justify-content-center align-items-center">
          <div className={props.noText ? '' : 'pe-2'}>
            {!spinnerState ? (
              <ShareFill />
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </div>
          {!props.noText ? (isPublished ? 'Unpublish' : 'Make Public') : null}
        </div>
      </Button>
      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        headerText={
          isPublished
            ? `Remove "${props.deck.name}" from Public Deck Archive?`
            : `Add "${props.deck.name}" to Public Deck Archive?`
        }
        mainText={props.deck.public_child ? '' : ''} // TODO
        buttonText={`${isPublished ? 'Remove' : 'Make'} Public`}
      />
    </>
  );
}

export default DeckTogglePublic;
