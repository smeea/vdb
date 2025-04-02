import {
  Hr,
  TdaDeckDescription,
  TwdResultCryptTable,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
} from "@/components";
import { AUTHOR, CRYPT, LIBRARY } from "@/constants";

const TdaDeck = ({ deck }) => {
  return (
    <div className="group flex flex-col gap-6" key={deck[AUTHOR]}>
      <div className="flex gap-2 max-lg:flex-col">
        <div className="basis-full lg:basis-1/4">
          <TdaDeckDescription deck={deck} />
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
