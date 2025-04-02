import { DeckMissingModal } from "@/components";
import { CRYPT, LIBRARY, NAME } from "@/constants";
import { useDeckMissing } from "@/hooks";

const DeckMissingModalWrapper = ({ deck, setShow }) => {
  const { missingCrypt, missingLibrary } = useDeckMissing(deck);

  return (
    <DeckMissingModal
      deck={{
        [NAME]: `Missing card for ${deck[NAME]}`,
        [CRYPT]: missingCrypt,
        [LIBRARY]: missingLibrary,
      }}
      setShow={setShow}
    />
  );
};

export default DeckMissingModalWrapper;
