import { ButtonIconed } from "@/components";
import { useApp } from "@/context";
import Link45Deg from "@icons/link-45deg.svg?react";

const InventoryShareButton = ({ setShow }) => {
  const { isDesktop, setShowMenuButtons, setShowFloatingButtons } = useApp();

  const handleClick = () => {
    setShow(true);
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
  };

  return (
    <ButtonIconed
      variant={isDesktop ? "secondary" : "primary"}
      title="Share Inventory"
      onClick={handleClick}
      icon={<Link45Deg width="21" height="21" viewBox="0 0 15 15" />}
      text="Share Inventory"
    />
  );
};

export default InventoryShareButton;
