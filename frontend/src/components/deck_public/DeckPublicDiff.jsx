import { DiffCrypt, DiffLibrary, FlexGapped } from "@/components";
import { CRYPT, LIBRARY } from "@/constants";

const DeckPublicDiff = ({ deckFrom, deckTo }) => {
  return (
    <FlexGapped className="max-sm:flex-col">
      <div className="md:basis-7/12">
        <DiffCrypt deck={deckFrom} cardsTo={deckTo[CRYPT]} />
      </div>
      <div className="md:basis-5/12">
        <DiffLibrary deck={deckFrom} cardsTo={deckTo[LIBRARY]} />
      </div>
    </FlexGapped>
  );
};

export default DeckPublicDiff;
