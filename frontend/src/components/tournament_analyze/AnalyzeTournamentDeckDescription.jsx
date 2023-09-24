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
    <>
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
      {(deck.tags.superior.length > 0 || deck.base.length > 0) && (
        <TwdResultTags tags={deck.tags} />
      )}
      <div className="flex gap-2">
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
    </>
  );
};

export default AnalyzeTournamentDeckDescription;
