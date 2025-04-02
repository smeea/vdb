import {
  DeckCloneButton,
  PdaFavoriteButton,
  PdaResultDescriptionText,
  TwdOpenDeckButton,
} from "@/components";
import { DECKID } from "@/constants";
import { useApp } from "@/context";

const PdaResultDescription = ({ deck }) => {
  const { username } = useApp();

  return (
    <div className="flex justify-between lg:flex-col lg:gap-2">
      <div>
        <PdaResultDescriptionText deck={deck} />
      </div>
      <div className="flex gap-1 max-lg:flex-col max-lg:p-1 lg:basis-full">
        <div className="w-full">
          <TwdOpenDeckButton deckid={deck[DECKID]} />
        </div>
        {username && (
          <>
            <div className="w-full">
              <DeckCloneButton deck={deck} inTwdPda />
            </div>
            <div className="w-full">
              <PdaFavoriteButton deck={deck} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PdaResultDescription;
