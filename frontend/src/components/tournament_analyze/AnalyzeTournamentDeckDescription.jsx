import React from 'react';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg';
import StarFill from '@/assets/images/icons/star-fill.svg';
import {
  DeckCloneButton,
  TwdResultTags,
  TwdResultDescriptionTextTr,
} from '@/components';
import { useApp } from '@/context';

const AnalyzeTournamentDeckDescription = ({ deck }) => {
  const { username, isMobile } = useApp();

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
      {username && (
        <div className="w-full">
          <DeckCloneButton
            deck={{ ...deck, tags: [...deck.tags.superior, ...deck.tags.base] }}
            inTwdPda
          />
        </div>
      )}
    </>
  );
};

export default AnalyzeTournamentDeckDescription;
