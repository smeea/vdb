import React from 'react';
import { useNavigate } from 'react-router';
import TrophyFill from '@icons/trophy-fill.svg?react';
import PersonFill from '@icons/person-fill.svg?react';
import TagFill from '@icons/tag-fill.svg?react';
import CalendarEvent from '@icons/calendar-event.svg?react';
import GeoAltFill from '@icons/geo-alt-fill.svg?react';
import { TwdResultTags, TwdResultDescriptionTextTr } from '@/components';
import { useApp, searchTwdForm, clearSearchForm } from '@/context';
import { getTags } from '@/utils';
import {
  SUPERIOR,
  BASE,
  CRYPT,
  LIBRARY,
  NAME,
  LOCATION,
  CREATION_DATE,
  AUTHOR,
  TWD,
} from '@/constants';

const TwdResultDescriptionText = ({ deck }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();
  const tags = getTags(deck[CRYPT], deck[LIBRARY]);

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
            {deck['event']}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <GeoAltFill /> : <>Place:</>}
          >
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
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
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
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
      {(tags[SUPERIOR].length > 0 || tags[BASE].length > 0) && <TwdResultTags tags={tags} />}
    </>
  );
};

export default TwdResultDescriptionText;
