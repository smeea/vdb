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

const AnalyzeTournamentInfo = ({ info, decks }) => {
  const { isMobile } = useApp();

  return (
    <div className="flex flex-col max-sm:px-1">
      {!isMobile && <Title>General Info</Title>}
      <table>
        <tbody>
          <TwdResultDescriptionTextTr title={isMobile ? <TrophyFill /> : <>Event:</>}>
            {info.event}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <GeoAltFill /> : <>Place:</>}>
            {info.location}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <CalendarEvent /> : <>Date:</>}>
            {info.date}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <TagFill /> : <>Format:</>}>
            {info.rounds - 1} Rounds + Final
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <PersonFill /> : <>Players:</>}>
            {info.players}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <PersonCheckFill /> : <>Reported Decks:</>}>
            <>
              {Object.keys(decks).length}{' '}
              <div className="inline text-midGray dark:text-midGrayDark">
                ({Math.round((Object.keys(decks).length / info.players) * 100)}
                %)
              </div>
            </>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr>
            <div className="text-midGray dark:text-midGrayDark">
              median reported place: {info.medianReportedRank}, &quot;
              <div className="inline text-sm font-bold text-[#ff00aa]">|</div>
              &quot;
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <Repeat /> : <>Total Matches:</>}>
            {info.matches}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr>
            <div className="text-midGray dark:text-midGrayDark">
              avg per match: {info.avgMatchGw}GW + {info.avgMatchVp}VP
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <TicketPerforated /> : <>Total Score:</>}>
            {info.totalGw}GW + {info.totalVp}VP{' '}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr>
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
