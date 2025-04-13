import { ButtonIconed } from "@/components";
import PlayFill from "@icons/play-fill.svg?react";
import { Link } from "react-router";

const TwdOpenDeckButton = ({ deckid, url, noText }) => {
  return (
    <Link to={url ?? `/decks/${deckid}`} className="hover:no-underline">
      <ButtonIconed
        className="w-full"
        icon={<PlayFill height="18" viewBox="0 0 12 14" />}
        text={noText ? null : "Open"}
      />
    </Link>
  );
};

export default TwdOpenDeckButton;
