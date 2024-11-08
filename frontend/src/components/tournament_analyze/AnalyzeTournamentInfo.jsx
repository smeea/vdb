import React from 'react';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg?react';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import PersonCheckFill from '@/assets/images/icons/person-check-fill.svg?react';
import TicketPerforated from '@/assets/images/icons/ticket-perforated.svg?react';
import TagFill from '@/assets/images/icons/tag-fill.svg?react';
import Repeat from '@/assets/images/icons/repeat.svg?react';
import CalendarEvent from '@/assets/images/icons/calendar-event.svg?react';
import GeoAltFill from '@/assets/images/icons/geo-alt-fill.svg?react';
import { TwdResultDescriptionTextTr, Title } from '@/components';
import { useApp } from '@/context';
import { EVENT, LOCATION, ROUNDS, DATE, PLAYERS } from '@/constants';

const AnalyzeTournamentInfo = ({ info, decks }) => {
  const { isMobile } = useApp();

  return (
    <div className="flex flex-col">
      {!isMobile && <Title>General Info</Title>}
      <table>
        <tbody>
          <TwdResultDescriptionTextTr title={isMobile ? <TrophyFill /> : <>Event:</>}>
            {info[EVENT]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <GeoAltFill /> : <>Place:</>}>
            {info[LOCATION]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <CalendarEvent /> : <>Date:</>}>
            {info[DATE]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <TagFill /> : <>Format:</>}>
            {info[ROUNDS] - 1} Rounds + Final
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <PersonFill /> : <>Players:</>}>
            {info[PLAYERS]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            title={
              isMobile ? (
                <div className="pl-0.5">
                  <PersonCheckFill />
                </div>
              ) : (
                <>Reported Decks:</>
              )
            }
          >
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
          <TwdResultDescriptionTextTr title={isMobile ? <Repeat /> : <>Total Matches:</>}>
            <div>{info.matches}</div>
            <div className="text-midGray dark:text-midGrayDark">
              avg per match: {info.avgMatchGw}GW + {info.avgMatchVp}VP
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <TicketPerforated /> : <>Total Score:</>}>
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
