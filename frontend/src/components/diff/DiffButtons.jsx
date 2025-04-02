import {
  DeckMissingButton,
  DiffBackButton,
  DiffCopyUrlButton,
  DiffProxyButtonWrapper,
} from "@/components";
import { DECKID } from "@/constants";

const DiffButtons = ({ setShowProxySelect, setShowMissing, deckFrom, deckTo }) => {
  return (
    <div className="flex flex-col gap-1">
      <DiffBackButton deckid={deckFrom?.[DECKID]} />
      <DiffCopyUrlButton deckFromId={deckFrom?.[DECKID]} deckToId={deckTo?.[DECKID]} />
      {deckFrom && deckTo && (
        <>
          <DiffProxyButtonWrapper
            deckFrom={deckFrom}
            deckTo={deckTo}
            setShowProxySelect={setShowProxySelect}
          />
          <DeckMissingButton setShow={setShowMissing} />
        </>
      )}
    </div>
  );
};

export default DiffButtons;
