import React from 'react';
import { useNavigate } from 'react-router-dom';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg?react';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import TagFill from '@/assets/images/icons/tag-fill.svg?react';
import CalendarEvent from '@/assets/images/icons/calendar-event.svg?react';
import GeoAltFill from '@/assets/images/icons/geo-alt-fill.svg?react';
import { TwdResultTags, TwdResultDescriptionTextTr } from '@/components';
import { useApp, searchTwdForm, clearSearchForm } from '@/context';
import { useTags } from '@/hooks';
import { LOCATION, CREATION_DATE, AUTHOR, TWD } from '@/constants';

const TwdResultDescriptionText = ({ deck }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();
  const tags = useTags(deck.crypt, deck.library);

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
          <TwdResultDescriptionTextTr title={isMobile ? <CalendarEvent /> : <>Date:</>}>
            {deck[CREATION_DATE]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <TrophyFill /> : <>Event:</>}>
            {deck['event']}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <GeoAltFill /> : <>Place:</>}>
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
              onClick={() => handleClick(LOCATION, deck[LOCATION])}
            >
              {deck[LOCATION]}
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <PersonFill /> : <>Player:</>}>
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
              onClick={() => handleClick(AUTHOR, deck[AUTHOR])}
            >
              {deck[AUTHOR]}
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <TagFill /> : <>Deck:</>}>
            {deck['name']}
          </TwdResultDescriptionTextTr>
        </tbody>
      </table>
      {(tags.superior.length > 0 || tags.base.length > 0) && <TwdResultTags tags={tags} />}
    </>
  );
};

export default TwdResultDescriptionText;
