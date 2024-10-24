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
    <div className="flex justify-between lg:flex-col lg:gap-2">
      <div>
        <table>
          <tbody>
            <TwdResultDescriptionTextTr title={isMobile ? <TrophyFill /> : <>Place:</>}>
              {deck.score.rank}
            </TwdResultDescriptionTextTr>
            <TwdResultDescriptionTextTr title={isMobile ? <StarFill /> : <>Score:</>}>
              {deck.score.gw}GW + {deck.score.vp}VP
            </TwdResultDescriptionTextTr>
          </tbody>
        </table>
        {(deck.tags.superior.length > 0 || deck.tags.base.length > 0) && (
          <TwdResultTags tags={deck.tags} />
        )}
      </div>
      <div className="flex justify-between gap-1 max-lg:flex-col max-lg:p-1 lg:basis-full">
        <div className="basis-full">
          <TwdOpenDeckButton url={deckInUrl} />
        </div>
        {username && (
          <div className="basis-full">
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
