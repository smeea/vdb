import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import NodeMinusFill from 'assets/images/icons/node-minus-fill.svg';
import { ButtonIconed, ModalConfirmation } from 'components';
import { deckStore, useApp } from 'context';

const DeckBranchDeleteButton = ({ deck, noText }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteBranch(deck.deckid);
    setShowConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const deleteBranch = (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}/branch`;
    const options = {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(url, options).then(() => {
      const masterId = decks[deckid].master || null;
      const branches = masterId
        ? [...decks[masterId].branches]
        : [...decks[deckid].branches];

      delete deckStore.decks[deckid];

      if (masterId) {
        branches.splice(branches.indexOf(deckid), 1);
        deckStore.decks[masterId].branches = branches;
        navigate(`/decks/${masterId}`);
      } else {
        const newMasterId = branches.pop();
        deckStore.decks[newMasterId].branches = branches;
        deckStore.decks[newMasterId].master = null;
        branches.map((b) => {
          deckStore.decks[b].master = newMasterId;
        });
        navigate(`/decks/${newMasterId}`);
      }
    });
  };

  return (
    <>
      <ButtonIconed
        variant={noText ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
        title="Delete Revision"
        icon={
          <NodeMinusFill
            width={noText ? '18' : '21'}
            height={noText ? '22' : '21'}
            viewBox="0 0 16 16"
          />
        }
        text={noText ? null : 'Delete Revision'}
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
