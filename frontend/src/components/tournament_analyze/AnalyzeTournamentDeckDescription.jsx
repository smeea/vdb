import React from 'react';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg';
import StarFill from '@/assets/images/icons/star-fill.svg';
import { TwdResultTags, TwdResultDescriptionTextTr } from '@/components';
import { useApp } from '@/context';
import { useTags } from '@/hooks';

const AnalyzeTournamentDeckDescription = ({ deck }) => {
  const { isMobile } = useApp();

  const tags = useTags(deck.crypt, deck.library);

  // TODO mobile layout
  return (
    <>
      <table>
        <tbody>
          <TwdResultDescriptionTextTr
            title={isMobile ? <TrophyFill /> : <>Final Rank:</>}
          >
            {deck.score.rank}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            title={isMobile ? <StarFill /> : <>Scored GW + VP:</>}
          >
            {deck.score.gw}GW + {deck.score.vp}VP
          </TwdResultDescriptionTextTr>
        </tbody>
      </table>
      {(tags.superior.length > 0 || tags.base.length > 0) && (
        <TwdResultTags tags={tags} />
      )}
    </>
  );
};

export default AnalyzeTournamentDeckDescription;
