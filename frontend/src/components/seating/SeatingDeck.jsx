import PlayFill from "@icons/play-fill.svg?react";
import X from "@icons/x.svg?react";
import { Link } from "react-router";
import { Toggle } from "@/components";
import { DECKID, NAME, STATE } from "@/constants";

const SeatingDeck = ({ toggle, i, deck, disabled, remove }) => {
  return (
    <div className="flex items-center">
      <Toggle isOn={deck[STATE]} handleClick={() => toggle(i)} size="sm" disabled={disabled}>
        <div className="inline">{deck[NAME]}</div>
      </Toggle>
      {deck[DECKID] ? (
        <Link className="p-1" target="_blank" to={`/decks/${deck[DECKID]}`}>
          <PlayFill width="20" height="20" viewBox="0 0 16 16" />
        </Link>
      ) : (
        <div
          className="cursor-pointer p-0.5 text-fgRed dark:text-fgRedDark"
          onClick={() => remove(i)}
        >
          <X width="22" height="22" viewBox="0 0 16 16" />
        </div>
      )}
    </div>
  );
};

export default SeatingDeck;
