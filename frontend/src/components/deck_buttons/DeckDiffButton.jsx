import { ButtonIconed } from "@/components";
import { useApp } from "@/context";
import PlusSlashMinus from "@icons/plus-slash-minus.svg?react";
import { useNavigate } from "react-router";

const DeckDiffButton = ({ deckid }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();
  const handleClick = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
    navigate(`/diff/${deckid}/${deckid}`);
  };

  return (
    <ButtonIconed
      variant={isDesktop ? "secondary" : "primary"}
      onClick={handleClick}
      title="Compare Decks"
      icon={<PlusSlashMinus />}
      text="Compare"
    />
  );
};

export default DeckDiffButton;
