import { ButtonIconed } from "@/components";
import { useApp } from "@/context";
import Recycle from "@icons/recycle.svg?react";

const SeatingButton = ({ setShow }) => {
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
      title="Table Seating"
      icon={<Recycle width="18" height="18" viewBox="0 0 16 16" />}
      text="Table Seating"
    />
  );
};

export default SeatingButton;
