import { useState } from "react";
import Link45Deg from "@icons/link-45deg.svg?react";
import { ButtonIconed } from "@/components";

const ButtonCardCopyUrl = ({ cardid }) => {
  const [success, setSuccess] = useState(false);
  const deckUrl = `${import.meta.env.VITE_BASE_URL}/cards/${cardid}`;

  const handleClick = () => {
    navigator.clipboard.writeText(deckUrl);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  return (
    <ButtonIconed
      icon={<Link45Deg width="22" height="22" viewBox="0 0 16 16" />}
      variant={success ? "success" : "primary"}
      onClick={handleClick}
      title="Copy URL"
      text={success ? "Copied" : null}
    />
  );
};

export default ButtonCardCopyUrl;
