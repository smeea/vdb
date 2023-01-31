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
          <tr>
            <td className="text-fgSecondary dark:text-fgSecondaryDark">
              <div className="flex items-center font-bold">
                {isMobile ? <CalendarEvent /> : <>Date:</>}
              </div>
            </td>
            <td className="px-1">{deck['creation_date']}</td>
          </tr>
          <tr>
            <td className="text-fgSecondary dark:text-fgSecondaryDark">
              <div className="flex items-center font-bold">
                {isMobile ? <TrophyFill /> : <>Event:</>}
              </div>
            </td>
            <td className="px-1">{deck['event']}</td>
          </tr>
          <tr>
            <td className="text-fgSecondary dark:text-fgSecondaryDark">
              <div className="flex items-center font-bold">
                {isMobile ? <GeoAltFill /> : <>Location:</>}
              </div>
            </td>
            <td className="px-1">
              <div
                className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
                onClick={() => handleClick('location', deck['location'])}
              >
                {deck['location']}
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-fgSecondary dark:text-fgSecondaryDark">
              <div className="flex items-center font-bold">
                {isMobile ? <PersonFill /> : <>Player:</>}
              </div>
            </td>
            <td className="px-1">
              <div
                className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
                onClick={() => handleClick('author', deck['author'])}
              >
                {deck['author']} <br />
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-fgSecondary dark:text-fgSecondaryDark">
              <div className="flex items-center font-bold">
                {isMobile ? <TagFill /> : <>Deck:</>}
              </div>
            </td>
            <td className="px-1">{deck['name']}</td>
          </tr>
        </tbody>
      </table>
      {(tags.superior.length > 0 || tags.base.length > 0) && (
        <TwdResultTags tags={tags} />
      )}
    </>
  );
};

export default TwdResultDescriptionText;
