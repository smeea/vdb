import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import { DECKID, NAME } from "@/constants";

const SeatingTablePlayer = ({ deck, isFirst }) => {
  return (
    <div
      className={twMerge(
        "flex justify-center sm:whitespace-nowrap",
        isFirst
          ? "rounded-md border-2 border-borderPrimary border-dashed p-3 font-bold dark:border-borderPrimaryDark"
          : "p-3.5",
      )}
    >
      {deck[DECKID] ? (
        <Link target="_blank" rel="noreferrer" to={`/decks/${deck[DECKID]}`}>
          {deck[NAME]}
        </Link>
      ) : (
        deck[NAME]
      )}
    </div>
  );
};

export default SeatingTablePlayer;
