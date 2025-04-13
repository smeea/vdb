import { ButtonFloat } from "@/components";
import X from "@icons/x.svg?react";

const ButtonFloatClose = ({ handleClose, position, className }) => {
  return (
    <ButtonFloat onClick={handleClose} variant="danger" position={position} className={className}>
      <X width="40" height="40" viewBox="0 0 16 16" />
    </ButtonFloat>
  );
};

export default ButtonFloatClose;
