import { DeckMissingModal } from "@/components";
import { CRYPT, LIBRARY, NAME } from "@/constants";
import { getDiffMissing } from "@/utils";

const DiffMissingModalWrapper = ({ setShow, deckFrom, deckTo }) => {
  const { missingCrypt, missingLibrary } = getDiffMissing(deckFrom, deckTo);

  return (
    <DeckMissingModal
      deck={{
        [NAME]: `Missing card for ${deckFrom[NAME]}`,
        [CRYPT]: missingCrypt,
        [LIBRARY]: missingLibrary,
      }}
      setShow={setShow}
    />
  );
};

export default DiffMissingModalWrapper;
