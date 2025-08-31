import Globe2 from "@icons/globe2.svg?react";
import { ConditionalTooltipOrModal, Flag, ListEntry } from "@/components";
import { EN, ES, FR, LANG, PT } from "@/constants";
import { useApp } from "@/context";

const PlaytestReportLanguageSelect = () => {
  const { isMobile, playtestProfile } = useApp();

  const languages = {
    [EN]: "English",
    [ES]: "Spanish",
    [FR]: "French",
    [PT]: "Portuguese",
  };

  return (
    <ListEntry
      icon={<Globe2 />}
      title={
        <div className="flex gap-2">
          Language
          <ConditionalTooltipOrModal
            title="Playtest Language"
            overlay={
              <div className="flex flex-col gap-1">
                <div>
                  Language of playtest reports (only affects which of the coordinators will receive
                  it)
                </div>
                <div>Contact your Playtest Coordinator to change it</div>
                <div>Independent from selected language of card text</div>
              </div>
            }
          >
            <div className="text-fgThird dark:text-fgThirdDark">[?]</div>
          </ConditionalTooltipOrModal>
        </div>
      }
      basis={isMobile ? 2 : 3}
      forceOneLine
    >
      <div className="flex items-center gap-2">
        <Flag value={playtestProfile?.[LANG]} noTitle />
        {languages[playtestProfile?.[LANG]]}
      </div>
    </ListEntry>
  );
};

export default PlaytestReportLanguageSelect;
