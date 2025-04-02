import X from "@icons/x.svg?react";

const ButtonCloseModal = ({ handleClick }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative cursor-pointer before:absolute before:inset-[-6px] focus:outline-hidden"
    >
      <X width="32" height="32" viewBox="0 0 16 16" />
    </button>
  );
};

export default ButtonCloseModal;
