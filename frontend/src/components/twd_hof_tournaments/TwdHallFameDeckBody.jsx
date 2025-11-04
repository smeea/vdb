import {
  TwdResultCryptTable,
  TwdResultDescription,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
} from "@/components";
import { CARDS, CRYPT, DECKID, LIBRARY } from "@/constants";
import { useApp } from "@/context";
import { useFetch } from "@/hooks";
import { parseDeck } from "@/utils";

const TwdHallFameDeckBody = ({ deck }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const url = `${import.meta.env.VITE_API_URL}/deck/${deck[DECKID]}`;
  const { value } = useFetch(url, {});
  const cards = parseDeck(cryptCardBase, libraryCardBase, value?.[CARDS]);

  return (
    <div className="flex gap-2 max-md:flex-col">
      {value && (
        <>
          <TwdResultDescription deck={{ ...deck, ...value }} />
          <div className="flex basis-full gap-2 xl:basis-3/4">
            {isMobile ? (
              <>
                <div className="basis-1/2">
                  <TwdResultCryptTable crypt={cards[CRYPT]} />
                </div>
                <div className="basis-1/2">
                  <TwdResultLibraryKeyCardsTable library={cards[LIBRARY]} />
                </div>
              </>
            ) : (
              <>
                <div className="basis-1/3">
                  <TwdResultCryptTable crypt={cards[CRYPT]} />
                </div>
                <div className="basis-1/3">
                  <TwdResultLibraryByTypeTable library={cards[LIBRARY]} />
                </div>
                <div className="basis-1/3">
                  <TwdResultLibraryKeyCardsTable library={cards[LIBRARY]} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TwdHallFameDeckBody;
