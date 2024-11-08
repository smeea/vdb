import React, { useState } from 'react';
import Check2 from '@/assets/images/icons/check2.svg?react';
import PlusLg from '@/assets/images/icons/plus-lg.svg?react';
import { ButtonIconed, ModalConfirmation } from '@/components';
import { useApp, inventoryCardsAdd } from '@/context';
import { NAME, CRYPT, LIBRARY } from '@/constants';

const InventoryDeckAddButton = ({ deck, inInventory }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const inventoryDeckAdd = (deck) => {
    inventoryCardsAdd({ ...deck[CRYPT], ...deck[LIBRARY] });
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
        className="min-w-[65px]"
        variant={inInventory ? 'third' : 'primary'}
        onClick={() => setShowConfirmation(true)}
        title={inInventory ? 'Already in Inventory' : 'Add Deck to Inventory'}
        text={inInventory ?? null}
        icon={inInventory ? <Check2 /> : <PlusLg />}
      />
      {showConfirmation && (
        <ModalConfirmation
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          buttonText="Add"
          title={`Add deck ${deck[NAME]} to Inventory?`}
        />
      )}
    </>
  );
};

export default InventoryDeckAddButton;
