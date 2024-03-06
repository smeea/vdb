import React from 'react';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg?react';
import StarFill from '@/assets/images/icons/star-fill.svg?react';
import {
  DeckCloneButton,
  TwdOpenDeckButton,
  TwdResultTags,
  TwdResultDescriptionTextTr,
} from '@/components';
import { useApp } from '@/context';
import { getDeckInUrl } from '@/utils';

const AnalyzeTournamentDeckDescription = ({ deck }) => {
  const { username, isMobile } = useApp();
  const deckInUrl = getDeckInUrl(deck);

  return (
    <div className="flex lg:flex-col max-lg:py-1 max-sm:px-1">
      <div className="basis-9/12">
        <table>
          <tbody>
            <TwdResultDescriptionTextTr
              title={isMobile ? <TrophyFill /> : <>Place:</>}
            >
              {deck.score.rank}
            </TwdResultDescriptionTextTr>
            <TwdResultDescriptionTextTr
              title={isMobile ? <StarFill /> : <>GW + VP:</>}
            >
              {deck.score.gw}GW + {deck.score.vp}VP
            </TwdResultDescriptionTextTr>
          </tbody>
        </table>
        {(deck.tags.superior.length > 0 || deck.tags.base.length > 0) && (
          <TwdResultTags tags={deck.tags} />
        )}
      </div>
      <div className="flex basis-3/12 max-lg:flex-col gap-1 lg:gap-2">
        <div className="w-full">
          <TwdOpenDeckButton url={deckInUrl} />
        </div>
        {username && (
          <div className="w-full">
            <DeckCloneButton
              deck={{
                ...deck,
                tags: [...deck.tags.superior, ...deck.tags.base],
              }}
              inTwdPda
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzeTournamentDeckDescription;
