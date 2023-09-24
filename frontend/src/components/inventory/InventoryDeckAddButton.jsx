import React, { useState } from 'react';
import Check2 from '@/assets/images/icons/check2.svg?react';
import Plus from '@/assets/images/icons/plus.svg?react';
import { ButtonIconed, ModalConfirmation } from '@/components';
import { useApp, inventoryCardsAdd } from '@/context';

const InventoryDeckAddButton = ({ deck, inInventory }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const inventoryDeckAdd = (deck) => {
    inventoryCardsAdd({ ...deck.crypt, ...deck.library });
  };

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    inventoryDeckAdd(deck);
    setShowConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <ButtonIconed
        variant={inInventory ? 'third' : 'primary'}
        onClick={() => setShowConfirmation(true)}
        title={inInventory ? 'Already in Inventory' : 'Add Deck to Inventory'}
        text={inInventory ? inInventory : null}
        icon={inInventory ? <Check2 /> : <Plus />}
      />
      {showConfirmation && (
        <ModalConfirmation
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          buttonText="Add"
          title={'Add deck ' + deck.name + ' to Inventory?'}
          bordered
        />
      )}
    </>
  );
};

export default InventoryDeckAddButton;
