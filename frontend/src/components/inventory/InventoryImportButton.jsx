import { ButtonIconed } from "@/components";
import { useApp } from "@/context";
import Upload from "@icons/upload.svg?react";

const InventoryImportButton = ({ handleClick }) => {
  const { isDesktop } = useApp();

  return (
    <ButtonIconed
      variant={isDesktop ? "secondary" : "primary"}
      onClick={handleClick}
      title="Add cards from File"
      text="Add from File"
      icon={<Upload />}
    />
  );
};

export default InventoryImportButton;
