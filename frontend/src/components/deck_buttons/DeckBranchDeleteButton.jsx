import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router';
import NodeMinusFill from '@/assets/images/icons/node-minus-fill.svg?react';
import { ButtonIconed, ModalConfirmation } from '@/components';
import { deckStore, useApp } from '@/context';
import { deckServices } from '@/services';
import { NAME, DECKID, BRANCH_NAME, DECKS } from '@/constants';

const DeckBranchDeleteButton = ({ deck, noText }) => {
  const { isDesktop, setShowMenuButtons } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const decks = useSnapshot(deckStore)[DECKS];

  const handleClick = () => {
    deckServices.branchDelete(deck[DECKID], decks).then((deckid) => {
      navigate(`/decks/${deckid}`);
      setShowMenuButtons(false);
      setShowConfirmation(false);
    });
  };

  return (
    <>
      <ButtonIconed
        variant={noText || !isDesktop ? 'primary' : 'secondary'}
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
      {showConfirmation && (
        <ModalConfirmation
          handleConfirm={handleClick}
          handleCancel={() => setShowConfirmation(false)}
          title={`Delete revision "${deck[BRANCH_NAME]}" of deck "${deck[NAME]}"`}
          buttonText="Delete"
        />
      )}
    </>
  );
};

export default DeckBranchDeleteButton;
