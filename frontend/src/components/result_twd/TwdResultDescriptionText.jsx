import React from 'react';
import { useNavigate } from 'react-router-dom';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg';
import PersonFill from '@/assets/images/icons/person-fill.svg';
import TagFill from '@/assets/images/icons/tag-fill.svg';
import CalendarEvent from '@/assets/images/icons/calendar-event.svg';
import GeoAltFill from '@/assets/images/icons/geo-alt-fill.svg';
import { TwdResultTags } from '@/components';
import { useApp, searchTwdForm, clearSearchForm } from '@/context';
import { useTags } from '@/hooks';

const Tr = ({ title, children }) => {
  return (
    <tr>
      <td className="text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex items-center font-bold px-1.5 sm:px-0">
          {title}
        </div>
      </td>
      <td className="sm:pl-3">{children}</td>
    </tr>
  );
};

const TwdResultDescriptionText = ({ deck }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();
  const tags = useTags(deck.crypt, deck.library);

  const handleClick = (target, value) => {
    clearSearchForm('twd');
    searchTwdForm[target] = value;
    navigate(
      `/twd?q=${encodeURIComponent(JSON.stringify({ [target]: value }))}`
    );
  };

  return (
    <>
      <table>
        <tbody>
          <Tr title={isMobile ? <CalendarEvent /> : <>Date:</>}>
            {deck['creation_date']}
          </Tr>
          <Tr title={isMobile ? <TrophyFill /> : <>Event:</>}>
            {deck['event']}
          </Tr>
          <Tr title={isMobile ? <GeoAltFill /> : <>Place:</>}>
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
              onClick={() => handleClick('location', deck['location'])}
            >
              {deck['location']}
            </div>
          </Tr>
          <Tr title={isMobile ? <PersonFill /> : <>Player:</>}>
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
              onClick={() => handleClick('author', deck['author'])}
            >
              {deck['author']} <br />
            </div>
          </Tr>
          <Tr title={isMobile ? <TagFill /> : <>Deck:</>}>{deck['name']}</Tr>
        </tbody>
      </table>
      {(tags.superior.length > 0 || tags.base.length > 0) && (
        <TwdResultTags tags={tags} />
      )}
    </>
  );
};

export default TwdResultDescriptionText;
