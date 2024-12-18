import React from 'react';
import { TwdResultDescriptionTextTr, Title } from '@/components';
import { useApp } from '@/context';
import { EVENT, LOCATION, ROUNDS, DATE, PLAYERS } from '@/constants';

const AnalyzeTournamentInfo = ({ info, decks }) => {
  const { isMobile } = useApp();

  return (
    <div className="flex flex-col max-sm:px-2">
      {!isMobile && <Title>General Info</Title>}
      <table>
        <tbody>
          <TwdResultDescriptionTextTr title="Event:">{info[EVENT]}</TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title="Place:">{info[LOCATION]}</TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title="Date:">{info[DATE]}</TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title="Format:">
            {info[ROUNDS] - 1} Rounds + Final
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title="Players:">{info[PLAYERS]}</TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title="Reported Decks:">
            <div>
              {Object.keys(decks).length}{' '}
              <div className="inline text-midGray dark:text-midGrayDark">
                ({Math.round((Object.keys(decks).length / info[PLAYERS]) * 100)}
                %)
              </div>
            </div>
            <div className="text-midGray dark:text-midGrayDark">
              median reported place: {info.medianReportedRank}, &quot;
              <div className="inline text-sm font-bold text-[#ff00aa]">|</div>
              &quot;
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title="Total Matches:">
            <div>{info.matches}</div>
            <div className="text-midGray dark:text-midGrayDark">
              avg per match: {info.avgMatchGw}GW + {info.avgMatchVp}VP
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title="Total Score:">
            <div>
              {info.totalGw}GW + {info.totalVp}VP{' '}
            </div>
            <div className="text-midGray dark:text-midGrayDark">
              median per player: {info.medianPlayerGw}GW + {info.medianPlayerVp}
              VP
            </div>
          </TwdResultDescriptionTextTr>
        </tbody>
      </table>
    </div>
  );
};

export default AnalyzeTournamentInfo;
