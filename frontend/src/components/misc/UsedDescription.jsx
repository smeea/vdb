import { BRANCHES, BRANCH_NAME, MASTER, NAME, S } from "@/constants";
import PinAngleFill from "@icons/pin-angle-fill.svg?react";
import Shuffle from "@icons/shuffle.svg?react";

const UsedDescriptionDeck = ({ deck, t, q }) => {
  const isBranches = deck[MASTER] || (deck[BRANCHES] && deck[BRANCHES].length > 0);

  return (
    <div className="flex items-center gap-1">
      <div className="opacity-40">
        {t === S ? (
          <Shuffle width="16" height="16" viewBox="0 0 16 16" />
        ) : (
          <PinAngleFill width="16" height="16" viewBox="0 0 16 16" />
        )}
      </div>
      <b>{q}</b>
      <div className="truncate sm:max-w-[265px] md:max-w-[290px]">
        {` - ${deck[NAME]}${isBranches ? ` [${deck[BRANCH_NAME]}]` : ""} `}
      </div>
    </div>
  );
};

const UsedDescription = ({ usedCards, decks, inventoryType }) => {
  return (
    <>
      {Object.keys(usedCards).map((id) => {
        return (
          <UsedDescriptionDeck key={id} q={usedCards[id]} deck={decks[id]} t={inventoryType} />
        );
      })}
    </>
  );
};

export default UsedDescription;
