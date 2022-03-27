import React, { useState } from 'react';
import NodeMinusFill from 'assets/images/icons/node-minus-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckBranchDeleteButton = (props) => {
  const { getDecks, setActiveDeck, isMobile } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteBranch();
    setShowConfirmation(false);
    if (props.deck.master) {
      setActiveDeck({ src: 'my', deckid: props.deck.master });
    } else {
      setActiveDeck({ src: 'my', deckid: props.deck.branches[0] });
    }
    isMobile && props.setShowButtons(false);
  };

  const deleteBranch = () => {
    const url = `${process.env.API_URL}branch/remove`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckid: props.deck.deckid }),
    };
    fetch(url, options)
      .then(() => getDecks())
      .then(() => isMobile && props.setShowInfo(true));
  };

  return (
    <>
      <ButtonIconed
        variant={props.noText ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
        title="Delete Revision of the Deck"
        icon={
          <NodeMinusFill
            width={props.noText ? '16' : '21'}
            height={props.noText ? '16' : '21'}
            viewBox="0 0 16 16"
          />
        }
        text={!props.noText && 'Delete Revision'}
      />
      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        headerText={`Delete revision "${props.deck.branchName} of deck "${props.deck.name}"`}
        mainText="THIS CANNOT BE UNDONE!"
        buttonText="Delete"
      />
    </>
  );
};

export default DeckBranchDeleteButton;
