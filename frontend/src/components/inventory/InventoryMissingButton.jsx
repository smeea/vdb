import CartDash from "@icons/cart-dash.svg?react";
import CartPlus from "@icons/cart-plus.svg?react";
import { useState } from "react";
import { ButtonIconed, InventoryMissingModal } from "@/components";
import { SURPLUS } from "@/constants";
import { useApp } from "@/context";

const InventoryMissingButton = ({
  clan,
  type,
  discipline,
  crypt,
  library,
  category,
  onlyNotes,
}) => {
  const { isDesktop } = useApp();
  const [showModal, setShowModal] = useState();

  return (
    <>
      <ButtonIconed
        variant={isDesktop ? "secondary" : "primary"}
        onClick={() => setShowModal(SURPLUS)}
        title="Show Surplus Inventory Cards"
        icon={<CartPlus />}
        text="Surplus Cards"
      />
      <ButtonIconed
        variant={isDesktop ? "secondary" : "primary"}
        onClick={() => setShowModal(true)}
        title="Show Missing Inventory Cards"
        icon={<CartDash />}
        text="Missing Cards"
      />
      {showModal && (
        <InventoryMissingModal
          crypt={crypt}
          library={library}
          category={category}
          onlyNotes={onlyNotes}
          clan={clan}
          type={type}
          discipline={discipline}
          setShow={setShowModal}
          isSurplus={showModal === SURPLUS}
        />
      )}
    </>
  );
};

export default InventoryMissingButton;
