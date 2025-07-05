import { ConditionalTooltipOrModal, Toggle } from "@/components";
import { useApp } from "@/context";

const TooltipText = () => {
  return (
    <div className="flex flex-col gap-1">
      <div>For deck to be considered Limited you MUST manually add tag '2P' or 'V5' to it.</div>
      <div>Only in effect when Limited Mode is ON.</div>
      <div>You will see all decks with Binocular menu, regardless of this option.</div>
    </div>
  );
};

const LimitedOnlyDecksToggle = () => {
  const { limitedOnlyDecks, toggleLimitedOnlyDecks } = useApp();

  return (
    <Toggle isOn={limitedOnlyDecks} handleClick={toggleLimitedOnlyDecks}>
      <div className="flex items-center gap-2">
        <div>Only show Limited decks in Deck Selector</div>
        <ConditionalTooltipOrModal title="Only Show Limited Decks" overlay={<TooltipText />}>
          <div className="font-bold text-fgThird dark:text-fgThirdDark">[?]</div>
        </ConditionalTooltipOrModal>
      </div>
    </Toggle>
  );
};

export default LimitedOnlyDecksToggle;
