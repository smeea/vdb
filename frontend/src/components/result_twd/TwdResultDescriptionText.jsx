import { useNavigate } from 'react-router';
import CalendarEvent from '@icons/calendar-event.svg?react';
import GeoAltFill from '@icons/geo-alt-fill.svg?react';
import PersonFill from '@icons/person-fill.svg?react';
import TagFill from '@icons/tag-fill.svg?react';
import TrophyFill from '@icons/trophy-fill.svg?react';
import { TwdResultDescriptionTextTr, TwdResultTags } from '@/components';
import {
  AUTHOR,
  BASE,
  EVENT,
  CREATION_DATE,
  LOCATION,
  NAME,
  SUPERIOR,
  TAGS,
  TWD,
} from '@/constants';
import { clearSearchForm, searchTwdForm, useApp } from '@/context';

const TwdResultDescriptionText = ({ deck }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();

  const handleClick = (target, value) => {
    clearSearchForm(TWD);
    if (target === LOCATION) {
      value = { city: value };
    }
    searchTwdForm[target] = value;
    navigate(`/twd?q=${encodeURIComponent(JSON.stringify({ [target]: value }))}`);
  };

  return (
    <>
      <table>
        <tbody>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <CalendarEvent /> : <>Date:</>}
          >
            {deck[CREATION_DATE]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <TrophyFill /> : <>Event:</>}
          >
            {deck[EVENT]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <GeoAltFill /> : <>Place:</>}
          >
            <div
              className="text-fgSecondary dark:text-fgSecondaryDark hover:underline"
              onClick={() => handleClick(LOCATION, deck[LOCATION])}
            >
              {deck[LOCATION]}
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <PersonFill /> : <>Player:</>}
          >
            <div
              className="text-fgSecondary dark:text-fgSecondaryDark hover:underline"
              onClick={() => handleClick(AUTHOR, deck[AUTHOR])}
            >
              {deck[AUTHOR]}
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr iconed={isMobile} title={isMobile ? <TagFill /> : <>Deck:</>}>
            {deck[NAME]}
          </TwdResultDescriptionTextTr>
        </tbody>
      </table>
      {(deck[TAGS][SUPERIOR].length > 0 || deck[TAGS][BASE].length > 0) && (
        <TwdResultTags tags={deck[TAGS]} />
      )}
    </>
  );
};

export default TwdResultDescriptionText;
