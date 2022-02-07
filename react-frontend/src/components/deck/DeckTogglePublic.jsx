import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from 'assets/images/icons/share-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';

function DeckTogglePublic(props) {
  const { setDecks, isMobile } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    togglePublic();
    setShowConfirmation(false);
    isMobile && props.setShowButtons(false);
  };

  const togglePublic = () => {
    const url = `${process.env.API_URL}pda/${props.deck.deckid}`;
    const options = {
      method: props.deck.public ? 'DELETE' : 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(url, options).then(() => {
      setDecks((prevState) => ({
        ...prevState,
        [props.deck.deckid]: {
          ...prevState[props.deck.deckid],
          public: props.deck.public ? false : true,
        },
      }));
      isMobile && props.setShowInfo(true);
    });
  };

  return (
    <>
      <Button
        variant={props.noText ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
      >
        <div className="d-flex justify-content-center align-items-center">
          <div className={props.noText ? null : 'pe-2'}>
            <ShareFill />
          </div>
          {!props.noText && props.deck.public ? 'Unpublish' : 'Make Public'}
        </div>
      </Button>
      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        headerText={
          props.deck.public
            ? `Remove "${props.deck.name}" from Public Deck Archive?`
            : `Add "${props.deck.name}" to Public Deck Archive?`
        }
        mainText={props.deck.public ? '' : ''} // TODO
        buttonText="Make Public"
      />
    </>
  );
}

export default DeckTogglePublic;
