import { ButtonIconed } from "@/components";
import { useApp } from "@/context";
import Dice3 from "@icons/dice-3-fill.svg?react";

const DeckDrawButton = ({ setShow }) => {
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
      title="Deck Draw Simulator"
      icon={<Dice3 />}
      text="Draw Cards"
    />
  );
};

export default DeckDrawButton;
