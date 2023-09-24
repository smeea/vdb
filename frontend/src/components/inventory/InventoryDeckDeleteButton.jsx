import React, { useState } from 'react';
import TrashFill from '@/assets/images/icons/trash-fill.svg?react';
import { ButtonIconed, ModalConfirmation } from '@/components';
import { inventoryCardsAdd } from '@/context';

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
      <ButtonIconed
        variant={inInventory ? 'third' : 'primary'}
        onClick={() => setShowConfirmation(true)}
        title="Remove Deck from Inventory"
        disabled={!inInventory}
        icon={<TrashFill width="18" height="22" viewBox="0 0 18 16" />}
      />
      {showConfirmation && (
        <ModalConfirmation
          show={showConfirmation}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          buttonText="Remove"
          title={'Remove deck ' + deck.name + ' from Inventory?'}
          bordered
        />
      )}
    </>
  );
};

export default InventoryDeckDeleteButton;
