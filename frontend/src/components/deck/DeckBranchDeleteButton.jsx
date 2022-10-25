import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NodeMinusFill from 'assets/images/icons/node-minus-fill.svg';
import { ButtonIconed, ModalConfirmation } from 'components';
import { useApp } from 'context';

const DeckBranchDeleteButton = ({ deck, noText }) => {
  const { setDecks, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteBranch(deck.deckid);
    setShowConfirmation(false);
    if (deck.master) {
      navigate(`/decks/${deck.master}`);
    } else {
      navigate(`/decks/${deck.branches[0]}`);
    }
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
      setDecks((draft) => {
        const masterId = draft[deckid].master || null;
        const branches = masterId
          ? [...draft[masterId].branches]
          : [...draft[deckid].branches];

        delete draft[deckid];

        if (masterId) {
          branches.splice(branches.indexOf(deckid), 1);
          draft[masterId].branches = branches;
        } else {
          const newMasterId = branches.pop();
          draft[newMasterId].branches = branches;
          draft[newMasterId].master = null;
          branches.map((b) => {
            draft[b].master = newMasterId;
          });
        }

        console.log(draft);
      });
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
