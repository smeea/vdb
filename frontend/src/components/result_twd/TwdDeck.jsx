import {
  Hr,
  PdaResultDescription,
  TwdResultCryptTable,
  TwdResultDescription,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
} from "@/components";
import { CARDS, CRYPT, LIBRARY } from "@/constants";
import { useApp } from "@/context";
import { parseDeck } from "@/utils";

const TwdDeck = ({ deck, inPda }) => {
  const { cryptCardBase, libraryCardBase, isNarrow } = useApp();
  const { [CRYPT]: crypt, [LIBRARY]: library } = parseDeck(
    cryptCardBase,
    libraryCardBase,
    deck?.[CARDS],
  );

  if (!deck) return;
  return (
    <div className="group flex flex-col gap-6">
      <div className="flex gap-2 max-lg:flex-col">
        <div className="basis-full lg:basis-1/4">
          {inPda ? <PdaResultDescription deck={deck} /> : <TwdResultDescription deck={deck} />}
        </div>
        <div className="flex basis-full gap-2 lg:basis-3/4">
          <div className="basis-1/2 md:basis-1/3">
            <TwdResultCryptTable crypt={crypt} />
          </div>
          <div className="flex basis-1/2 gap-2 md:basis-2/3">
            <div className="basis-4/9 max-md:hidden">
              <TwdResultLibraryByTypeTable library={library} />
            </div>
            <div className="basis-5/9 max-md:basis-full">
              <TwdResultLibraryKeyCardsTable withHeader={isNarrow} library={library} />
            </div>
          </div>
        </div>
      </div>
      <div className="group-last:hidden">
        <Hr isThick />
      </div>
    </div>
  );
};

export default TwdDeck;
