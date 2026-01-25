import LockFill from "@icons/lock-fill.svg?react";
import UnlockFill from "@icons/unlock-fill.svg?react";
import { ButtonIconed } from "@/components";
import { DECKID, IS_FROZEN } from "@/constants";
import { useApp, deckUpdate } from "@/context";

const DeckFreezeButton = ({ deck, withText, className, roundedStyle, borderStyle }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();

  const handleClick = () => {
    deckUpdate(deck[DECKID], IS_FROZEN, !deck[IS_FROZEN])
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <ButtonIconed
      onClick={handleClick}
      title={`${deck[IS_FROZEN] ? "Disabled" : "Enabled"} Crypt/Library Editing`}
      className={className}
      roundedStyle={roundedStyle}
      borderStyle={borderStyle}
      variant={withText && isDesktop ? 'secondary' : 'primary'}
      icon={deck[IS_FROZEN] ? (
        <LockFill width="19" height="23" viewBox="0 0 16 16" />
      ) : (
        <UnlockFill width="19" height="23" viewBox="0 0 16 16" />
      )}
    text={withText && `Edit ${deck[IS_FROZEN] ? 'enabled' : 'disabled'}`}
    />
  );
};

export default DeckFreezeButton;
