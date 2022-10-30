import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { ModalConfirmation } from 'components';
import { inventoryCardsAdd } from 'context';

const InventoryDeckDeleteButton = ({ deck, inInventory }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const inventoryDeckDelete = (deck) => {
    const cards = {};
    Object.values({ ...deck.crypt, ...deck.library }).map((card) => {
      if (card.q) {
        cards[card.c.Id] = {
          c: card.c,
          q: -card.q,
        };
      }
    });

    inventoryCardsAdd(cards);
  };

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    inventoryDeckDelete(deck);
    setShowConfirmation(false);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShowConfirmation(true)}
        title="Remove Deck from Inventory"
        disabled={!inInventory}
      >
        <TrashFill />
      </Button>
      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        buttonText="Remove"
        headerText={'Remove deck ' + deck.name + ' from Inventory?'}
        nested
      />
    </>
  );
};

export default InventoryDeckDeleteButton;
