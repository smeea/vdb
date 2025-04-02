import {
  Hr,
  PdaResultDescription,
  TwdResultCryptTable,
  TwdResultDescription,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
} from "@/components";
import { CARDS, CRYPT, DECKID, LIBRARY } from "@/constants";
import { useApp } from "@/context";
import { parseDeck } from "@/utils";

const TwdDeck = ({ deck, inPda }) => {
  const { cryptCardBase, libraryCardBase, isNarrow } = useApp();

  // TODO fix mess
  const parsedDeck = {
    ...(deck || {}),
    ...parseDeck(cryptCardBase, libraryCardBase, deck?.[CARDS]),
  };

  return (
    <>
      {parsedDeck[DECKID] && (
        <div className="group flex flex-col gap-6">
          <div className="flex gap-2 max-lg:flex-col">
            <div className="basis-full lg:basis-1/4">
              {inPda ? (
                <PdaResultDescription deck={parsedDeck} />
              ) : (
                <TwdResultDescription deck={parsedDeck} />
              )}
            </div>
            <div className="flex basis-full gap-2 lg:basis-3/4">
              <div className="basis-1/2 md:basis-4/12">
                <TwdResultCryptTable crypt={parsedDeck[CRYPT]} />
              </div>
              <div className="max-md:hidden md:basis-3/12">
                <TwdResultLibraryByTypeTable library={parsedDeck[LIBRARY]} />
              </div>
              <div className="basis-1/2 md:basis-5/12">
                <TwdResultLibraryKeyCardsTable
                  withHeader={isNarrow}
                  library={parsedDeck[LIBRARY]}
                />
              </div>
            </div>
          </div>
          <div className="group-last:hidden">
            <Hr isThick />
          </div>
        </div>
      )}
    </>
  );
};

export default TwdDeck;
