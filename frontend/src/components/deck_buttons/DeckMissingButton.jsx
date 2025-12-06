import CartDash from "@icons/cart-dash.svg?react";
import { ButtonIconed } from "@/components";
import { useApp } from "@/context";

const DeckMissingButton = ({ setShow }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();

  const handleClick = () => {
    setShow(true);
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
  };

  return (
    <ButtonIconed
      variant={isDesktop ? "secondary" : "primary"}
      onClick={handleClick}
      title="Show Missing Cards"
      icon={<CartDash />}
      text="Missing Cards"
    />
  );
};

export default DeckMissingButton;
