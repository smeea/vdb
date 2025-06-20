import BinocularsFill from "@icons/binoculars-fill.svg?react";
import Plus from "@icons/plus.svg?react";
import { ButtonFloat } from "@/components";

const ButtonFloatAddOrSearch = ({ addMode, toggleAddMode }) => {
  return (
    <ButtonFloat onClick={toggleAddMode}>
      {addMode ? (
        <BinocularsFill width="27" height="27" viewBox="0 1 16 16" />
      ) : (
        <Plus width="47" height="47" viewBox="0 0 16 16" />
      )}
    </ButtonFloat>
  );
};

export default ButtonFloatAddOrSearch;
