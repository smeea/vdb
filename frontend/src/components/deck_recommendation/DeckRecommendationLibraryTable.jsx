import { useSnapshot } from "valtio";
import { DeckRecommendationLibraryTableRow } from "@/components";
import { DECK, ID } from "@/constants";
import { deckStore } from "@/context";

const DeckRecommendationLibraryTable = ({ handleClick, cards }) => {
  const deck = useSnapshot(deckStore)[DECK];

  return (
    <table className="w-full border-bgSecondary sm:border dark:border-bgSecondaryDark">
      <tbody>
        {cards.map((card) => {
          return (
            <DeckRecommendationLibraryTableRow
              key={card[ID]}
              card={card}
              deck={deck}
              handleClick={handleClick}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckRecommendationLibraryTable;
