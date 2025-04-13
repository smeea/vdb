import { ButtonIconed } from "@/components";
import XLg from "@icons/x-lg.svg?react";

const ButtonClose = ({ handleClick, title, className, text }) => {
  return (
    <ButtonIconed
      className={className}
      title={title}
      text={text}
      onClick={handleClick}
      icon={<XLg width="14" height="14" viewBox="0 0 16 16" />}
    />
  );
};

export default ButtonClose;
