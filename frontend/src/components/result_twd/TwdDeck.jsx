import {
  Hr,
  PdaResultDescription,
  ResultLibraryTypeImage,
  TwdResultCryptTable,
  TwdResultDescription,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
  TwdResultTags,
} from "@/components";
import { CARDS, CRYPT, LIBRARY, TAGS, SUPERIOR, BASE } from "@/constants";
import { useApp } from "@/context";
import { useDeckLibrary } from "@/hooks";
import { parseDeck } from "@/utils";

const TwdDeck = ({ deck, inPda }) => {
  const { cryptCardBase, libraryCardBase, isNarrow } = useApp();
  const { [CRYPT]: crypt, [LIBRARY]: library } = parseDeck(
    cryptCardBase,
    libraryCardBase,
    deck?.[CARDS],
  );

  const { libraryByTypeTotal } = useDeckLibrary(library);

  if (!deck) return;
  return (
    <div className="group flex flex-col gap-6">
      <div className="flex sm:gap-2 max-lg:flex-col">
        <div className="basis-full lg:basis-1/4">
          {inPda ? <PdaResultDescription deck={deck} /> : <TwdResultDescription deck={{...deck, [LIBRARY]: library}} />}
          <div className='sm:hidden'>
            {!inPda && (deck[TAGS][SUPERIOR].length > 0 || deck[TAGS][BASE].length > 0) && (
              <TwdResultTags tags={deck[TAGS]} />
            )}
            {Object.keys(libraryByTypeTotal).map((i) => (
              <div key={i} className="inline-block whitespace-nowrap pr-2.5">
                <div className="flex items-center gap-0.5">
                  <ResultLibraryTypeImage value={i} />
                  <div className="flex">{libraryByTypeTotal[i]}</div>
                </div>
              </div>
            ))}
          </div>
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
