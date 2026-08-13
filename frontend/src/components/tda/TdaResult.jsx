import { TdaResultTotal, TwdDeck } from "@/components";
import { AUTHOR, RANK_HIGH_LOW, RANK_LOW_HIGH } from "@/constants";
import { useApp } from "@/context";
import { decksSort } from "@/utils";

const TdaResult = ({ decks }) => {
  const { tdaSearchSort, setTdaSearchSort } = useApp();

  const sortMethods = {
    [RANK_HIGH_LOW]: "R↓",
    [RANK_LOW_HIGH]: "R↑",
  };

  const sortedDecks = decksSort(decks, tdaSearchSort);

  return (
    <div>
      <TdaResultTotal
        results={decks}
        sortMethods={sortMethods}
        sortMethod={tdaSearchSort}
        setSortMethod={setTdaSearchSort}
      />
      <div className="flex flex-col gap-4">
        {sortedDecks.map((deck) => (
          <TwdDeck deck={deck} key={deck[AUTHOR]} inTda />
        ))}
      </div>
    </div>
  );
};

export default TdaResult;
