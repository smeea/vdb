import { DeckProxyButton } from "@/components";
import { getDiffMissing } from "@/utils";

const DiffProxyButtonWrapper = ({ deckFrom, deckTo, setShowProxySelect }) => {
  const { missingCrypt, missingLibrary } = getDiffMissing(deckFrom, deckTo);

  return (
    <DeckProxyButton
      missingCrypt={missingCrypt}
      missingLibrary={missingLibrary}
      deck={deckFrom}
      setShowProxySelect={setShowProxySelect}
      inDiff
    />
  );
};

export default DiffProxyButtonWrapper;
