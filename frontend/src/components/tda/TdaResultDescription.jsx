import StarFill from "@icons/star-fill.svg?react";
import TrophyFill from "@icons/trophy-fill.svg?react";
import {
  DeckCloneButton,
  TwdOpenDeckButton,
  TwdResultDescriptionTextTr,
  TwdResultTags,
} from "@/components";
import { BASE, GW, RANK, SCORE, SUPERIOR, TAGS, VP } from "@/constants";
import { useApp } from "@/context";
import { getDeckInUrl } from "@/utils";

const TdaResultDescription = ({ deck }) => {
  const { username, isNarrow, isMobile } = useApp();
  const deckInUrl = getDeckInUrl(deck);

  return (
    <div className="flex justify-between lg:flex-col lg:gap-2">
      <div>
        <table>
          <tbody>
            <TwdResultDescriptionTextTr
              iconed={isMobile}
              title={isMobile ? <TrophyFill /> : "Place:"}
            >
              {deck[SCORE][RANK]}
            </TwdResultDescriptionTextTr>
            <TwdResultDescriptionTextTr
              iconed={isMobile}
              title={isMobile ? <StarFill /> : "Score:"}
            >
              {deck[SCORE][GW]}GW + {deck[SCORE][VP]}VP
            </TwdResultDescriptionTextTr>
          </tbody>
        </table>
      </div>
      {!isNarrow && <TwdResultTags tags={deck[TAGS]} />}
      <div className="flex justify-between gap-1 max-lg:flex-col max-lg:p-1 lg:basis-full">
        <div className="basis-full">
          <TwdOpenDeckButton url={deckInUrl} />
        </div>
        {username && (
          <div className="basis-full">
            <DeckCloneButton
              deck={{
                ...deck,
                tags: [...deck[TAGS][SUPERIOR], ...deck[TAGS][BASE]],
              }}
              inTwdPda
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TdaResultDescription;
