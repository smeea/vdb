import React, { useState } from 'react';
import {
  ButtonGroup,
  Spinner,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import ClipboardPlus from 'assets/images/icons/clipboard-plus.svg';
import ShareFill from 'assets/images/icons/share-fill.svg';
import { useApp } from 'context';

function DeckPublicButton(props) {
  const { setActiveDeck, setDecks, isMobile } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    togglePublic();
    setShowConfirmation(false);
    isMobile && props.setShowButtons(false);
  };

  const isChild = props.deck.public_parent ? true : false;
  const parent = isChild ? props.deck.public_parent : props.deck.deckid;
  const isPublished =
    props.deck.public_parent || props.deck.public_child ? true : false;

  const togglePublic = () => {
    // Accept deckid of main (parent) deck and public (child), handled on backend
    const url = `${process.env.API_URL}pda/${props.deck.deckid}`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setSpinnerState(true);

    fetch(url, options);

    setSpinnerState(false);
    isMobile && props.setShowInfo(true);
  };

  const ButtonOptions = (
    <>
      <Dropdown.Item onClick={() => setShowConfirmation(true)}>
        Toggle Public/Private Deck
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setShowConfirmation(true)}>
        Sync Public
      </Dropdown.Item>
    </>
  );

  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        variant="secondary"
        title={
          <div className="d-flex justify-content-center align-items-center">
            <div className={props.noText ? '' : 'pe-2'}>
              {!spinnerState ? (
                <ShareFill />
              ) : (
                <Spinner animation="border" size="sm" />
              )}
            </div>
            Public Deck
          </div>
        }
      >
        {ButtonOptions}
      </DropdownButton>
      {/* <ModalConfirmation */}
      {/*   show={showConfirmation} */}
      {/*   handleConfirm={handleConfirm} */}
      {/*   handleCancel={handleCancel} */}
      {/*   headerText={`Sync "${props.deck.name}" with Public Deck Archive?`} */}
      {/*   mainText={props.deck.public_child ? '' : ''} // TODO */}
      {/*   buttonText="Sync" */}
      {/* /> */}
      {/* <ModalConfirmation */}
      {/*   show={showConfirmation} */}
      {/*   handleConfirm={handleConfirm} */}
      {/*   handleCancel={handleCancel} */}
      {/*   headerText={ */}
      {/*     isPublished */}
      {/*       ? `Remove "${props.deck.name}" from Public Deck Archive?` */}
      {/*       : `Add "${props.deck.name}" to Public Deck Archive?` */}
      {/*   } */}
      {/*   mainText={props.deck.public_child ? '' : ''} // TODO */}
      {/*   buttonText={`${isPublished ? 'Remove' : 'Make'} Public`} */}
      {/* /> */}
    </>
  );
}

export default DeckPublicButton;
