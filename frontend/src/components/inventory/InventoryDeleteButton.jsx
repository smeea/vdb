import TrashFill from "@icons/trash-fill.svg?react";
import { useState } from "react";
import { ButtonIconed, ModalConfirmation } from "@/components";
import { useApp } from "@/context";
import { inventoryServices } from "@/services";

const InventoryDelete = () => {
  const { isDesktop, setShowMenuButtons, setShowFloatingButtons } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    inventoryServices.deleteInventory();
    setShowConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <ButtonIconed
        variant={isDesktop ? "secondary" : "primary"}
        onClick={() => setShowConfirmation(true)}
        title="Delete Inventory"
        icon={<TrashFill />}
        text="Delete Inventory"
      />
      {showConfirmation && (
        <ModalConfirmation
          withWrittenConfirmation={true}
          handleConfirm={handleClick}
          handleCancel={() => setShowConfirmation(false)}
          title="Delete Inventory"
          buttonText="Delete"
          buttonVariant="danger"
        />
      )}
    </>
  );
};

export default InventoryDelete;
