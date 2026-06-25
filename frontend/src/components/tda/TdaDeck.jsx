import cardtypeSortedFull from "@/assets/data/cardtypeSortedFull.json";
import {
  Hr,
  ResultLibraryTypeImage,
  TdaDeckDescription,
  TwdResultCryptTable,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
  TwdResultTags,
} from "@/components";
import { AUTHOR, CRYPT, LIBRARY, TAGS } from "@/constants";
import { useDeckLibrary } from "@/hooks";

const TdaDeck = ({ deck }) => {
  const { libraryByTypeTotal } = useDeckLibrary(deck[LIBRARY]);

  return (
    <div className="group flex flex-col gap-6" key={deck[AUTHOR]}>
      <div className="flex gap-2 max-lg:flex-col">
        <div className="basis-full lg:basis-1/4">
          <TdaDeckDescription deck={deck} />
        </div>
        <div className="flex px-2 sm:hidden">
          <div className="basis-4/9">
            <TwdResultTags tags={deck[TAGS]} />
          </div>
          <div className="basis-5/9">
            {cardtypeSortedFull
              .filter((t) => libraryByTypeTotal[t])
              .map((i) => (
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
            <TwdResultCryptTable crypt={deck[CRYPT]} />
          </div>
          <div className="max-md:hidden md:basis-1/3">
            <TwdResultLibraryByTypeTable library={deck[LIBRARY]} />
          </div>
          <div className="basis-1/2 md:basis-1/3">
            <TwdResultLibraryKeyCardsTable library={deck[LIBRARY]} />
          </div>
        </div>
      </div>
      <div className="group-last:hidden">
        <Hr isThick />
      </div>
    </div>
  );
};

export default TdaDeck;
