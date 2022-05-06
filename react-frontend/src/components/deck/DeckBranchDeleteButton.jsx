import React, { useState } from 'react';
import NodeMinusFill from 'assets/images/icons/node-minus-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckBranchDeleteButton = ({ deck, setShowInfo, noText }) => {
  const {
    setDecks,
    setActiveDeck,
    isMobile,
    setShowFloatingButtons,
    setShowMenuButtons,
  } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteBranch(deck.deckid);
    setShowConfirmation(false);
    if (deck.master) {
      setActiveDeck({ src: 'my', deckid: deck.master });
    } else {
      setActiveDeck({ src: 'my', deckid: deck.branches[0] });
    }
    setShowMenuButtons(true);
    setShowFloatingButtons(false);
  };

  const deleteBranch = (deckid) => {
    const url = `${process.env.API_URL}branch/remove`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckid: deckid }),
    };
    fetch(url, options).then(() => {
      setDecks((prevState) => {
        const newState = { ...prevState };
        delete newState[deckid];

        const masterId = prevState[deckid].master || null;
        const branches = masterId
          ? prevState[masterId].branches
          : prevState[deckid].branches;

        if (masterId) {
          branches.splice(branches.indexOf(deckid), 1);
          newState[masterId].branches = branches;
        } else {
          const newMasterId = branches.pop();
          newState[newMasterId].branches = branches;
          newState[newMasterId].master = null;
          branches.map((b) => {
            newState[b].master = newMasterId;
          });
        }

        return newState;
      });
      isMobile && setShowInfo(true);
    });
  };

  return (
    <>
      <ButtonIconed
        variant={noText ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
        title="Delete Revision of the Deck"
        icon={
          <NodeMinusFill
            width={noText ? '16' : '21'}
            height={noText ? '16' : '21'}
            viewBox="0 0 16 16"
          />
        }
        text={!noText && 'Delete Revision'}
      />
      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        headerText={`Delete revision "${deck.branchName} of deck "${deck.name}"`}
        mainText="THIS CANNOT BE UNDONE!"
        buttonText="Delete"
      />
    </>
  );
};

export default DeckBranchDeleteButton;
