import React from 'react';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg';
import PersonFill from '@/assets/images/icons/person-fill.svg';
import TagFill from '@/assets/images/icons/tag-fill.svg';
import CalendarEvent from '@/assets/images/icons/calendar-event.svg';
import GeoAltFill from '@/assets/images/icons/geo-alt-fill.svg';
import { TwdResultDescriptionTextTr, Title } from '@/components';
import { useApp } from '@/context';

const AnalyzeTournamentInfo = ({ info, decks }) => {
  const { isMobile } = useApp();

  return (
    <div className="flex flex-col border p-4">
      <Title>General Info</Title>
      <table>
        <tbody>
          <TwdResultDescriptionTextTr
            title={isMobile ? <TrophyFill /> : <>Event:</>}
          >
            {info.name}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            title={isMobile ? <GeoAltFill /> : <>Place:</>}
          >
            {info.location}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            title={isMobile ? <CalendarEvent /> : <>Date:</>}
          >
            {info.date}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            title={
              isMobile ? (
                <PersonFill />
              ) : (
                <>Players{decks && ' / Known Decks'}:</>
              )
            }
          >
            {info.players}{' '}
            {decks && (
              <>
                / {Object.keys(decks).length}{' '}
                <div className="inline text-midGray dark:text-midGrayDark">
                  (
                  {Math.round((Object.keys(decks).length / info.players) * 100)}
                  %)
                </div>
              </>
            )}
            <br />
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            title={isMobile ? <TagFill /> : <>Scored GW + VP:</>}
          >
            {info.totalGw} + {info.totalVp} <br />
          </TwdResultDescriptionTextTr>
        </tbody>
      </table>
    </div>
  );
};

export default AnalyzeTournamentInfo;
