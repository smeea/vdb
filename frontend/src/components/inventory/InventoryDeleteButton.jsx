import React, { useState } from 'react';
import TrashFill from '@/assets/images/icons/trash-fill.svg?react';
import { ButtonIconed, ModalConfirmation } from '@/components';
import { useApp, setInventoryCrypt, setInventoryLibrary } from '@/context';

const InventoryDelete = () => {
  const { isDesktop, setShowMenuButtons, setShowFloatingButtons } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteInventory();
    setShowConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const deleteInventory = () => {
    const url = `${import.meta.env.VITE_API_URL}/inventory`;
    const options = {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options).then(() => {
      setInventoryCrypt({});
      setInventoryLibrary({});
    });
  };

  return (
    <>
      <ButtonIconed
        variant={isDesktop ? 'secondary' : 'primary'}
        onClick={() => setShowConfirmation(true)}
        title="Delete Inventory"
        icon={<TrashFill />}
        text="Delete Inventory"
      />
      {showConfirmation && (
        <ModalConfirmation
          withWrittenConfirmation={true}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          title={`Delete Inventory`}
          buttonText="Delete"
          buttonVariant="danger"
        >
          THIS CANNOT BE UNDONE!
        </ModalConfirmation>
      )}
    </>
  );
};

export default InventoryDelete;
