import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from 'assets/images/icons/share-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';

function DeckTogglePublic(props) {
  const { isMobile } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    togglePublic();
    setShowConfirmation(false);
    isMobile && props.setShowButtons(false);
  };

  const togglePublic = () => {
    const url = `${process.env.API_URL}pda/${
      props.isPublic ? 'delete' : 'create'
    }`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckid: props.deck.deckid }),
    };
    fetch(url, options).then(() => isMobile && props.setShowInfo(true));
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
          {!props.noText && props.isPublic ? 'Unpublic' : 'Make Public'}
        </div>
      </Button>
      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        headerText={
          props.isPublic
            ? `Remove "${props.deck.name}" from Public Deck Archive?`
            : `Add "${props.deck.name}" to Public Deck Archive?`
        }
        mainText={props.isPublic ? '' : ''} // TODO
        buttonText="Make Public"
      />
    </>
  );
}

export default DeckTogglePublic;
