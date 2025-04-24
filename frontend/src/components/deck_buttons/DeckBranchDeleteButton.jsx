import { ButtonIconed, ModalConfirmation } from "@/components";
import { BRANCH_NAME, DECKID, DECKS, NAME } from "@/constants";
import { deckStore, useApp } from "@/context";
import { deckServices } from "@/services";
import NodeMinusFill from "@icons/node-minus-fill.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSnapshot } from "valtio";

const DeckBranchDeleteButton = ({ deck, noText, className }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const decks = useSnapshot(deckStore)[DECKS];

  const handleClick = () => {
    deckServices
      .branchDelete(deck[DECKID], decks)
      .then((deckid) => {
        navigate(`/decks/${deckid}`);
      })
      .finally(() => {
        setShowConfirmation(false);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
      });
  };

  return (
    <>
      <ButtonIconed
        className={className}
        variant={noText || !isDesktop ? "primary" : "secondary"}
        onClick={() => setShowConfirmation(true)}
        title="Delete Revision"
        icon={
          <NodeMinusFill
            width={noText ? "18" : "21"}
            height={noText ? "22" : "21"}
            viewBox="0 0 16 16"
          />
        }
        text={noText ? null : "Delete Revision"}
      />
      {showConfirmation && (
        <ModalConfirmation
          handleConfirm={handleClick}
          handleCancel={() => setShowConfirmation(false)}
          title={`Delete revision "${deck[BRANCH_NAME]}" of deck "${deck[NAME]}"`}
          buttonText="Delete"
          buttonVariant="danger"
        />
      )}
    </>
  );
};

export default DeckBranchDeleteButton;
