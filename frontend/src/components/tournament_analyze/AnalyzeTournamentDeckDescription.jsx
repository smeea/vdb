import React from 'react';
import TrophyFill from '@icons/trophy-fill.svg?react';
import StarFill from '@icons/star-fill.svg?react';
import {
  DeckCloneButton,
  TwdOpenDeckButton,
  TwdResultTags,
  TwdResultDescriptionTextTr,
} from '@/components';
import { useApp } from '@/context';
import { getDeckInUrl } from '@/utils';
import { SCORE, GW, VP, RANK, TAGS } from '@/constants';

const AnalyzeTournamentDeckDescription = ({ deck }) => {
  const { username, isMobile } = useApp();
  const deckInUrl = getDeckInUrl(deck);

  return (
    <div className="flex justify-between lg:flex-col lg:gap-2">
      <div>
        <table>
          <tbody>
            <TwdResultDescriptionTextTr
              iconed={isMobile}
              title={isMobile ? <TrophyFill /> : <>Place:</>}
            >
              {deck[SCORE][RANK]}
            </TwdResultDescriptionTextTr>
            <TwdResultDescriptionTextTr
              iconed={isMobile}
              title={isMobile ? <StarFill /> : <>Score:</>}
            >
              {deck[SCORE][GW]}GW + {deck[SCORE][VP]}VP
            </TwdResultDescriptionTextTr>
          </tbody>
        </table>
        {(deck[TAGS].superior.length > 0 || deck[TAGS].base.length > 0) && (
          <TwdResultTags tags={deck[TAGS]} />
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
                tags: [...deck[TAGS].superior, ...deck[TAGS].base],
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
