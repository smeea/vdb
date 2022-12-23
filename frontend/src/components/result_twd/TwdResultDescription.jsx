import React from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarEvent from 'assets/images/icons/calendar-event.svg';
import GeoAltFill from 'assets/images/icons/geo-alt-fill.svg';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import TagFill from 'assets/images/icons/tag-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import { TwdResultTags, TwdOpenDeckButton, DeckCloneButton } from 'components';
import { useApp, searchTwdForm, clearSearchForm } from 'context';
import { useTags } from 'hooks';

const TwdResultDescription = ({ deck }) => {
  const { username, isMobile, isDesktop } = useApp();
  const tags = useTags(deck.crypt, deck.library);
  const navigate = useNavigate();

  const handleClick = (target, value) => {
    clearSearchForm('twd');
    searchTwdForm[target] = value;
    navigate(
      `/twd?q=${encodeURIComponent(JSON.stringify({ [target]: value }))}`
    );
  };

  const Description = (
    <>
      <table>
        <tbody>
          <tr>
            <td className="text-fgSecondary dark:text-fgSecondaryDark">
              {isMobile ? (
                <div className="flex items-center">
                  <CalendarEvent />
                </div>
              ) : (
                <b>Date:</b>
              )}
            </td>
            <td>{deck['creation_date']}</td>
          </tr>
          <tr>
            <td className="text-fgSecondary dark:text-fgSecondaryDark">
              {isMobile ? (
                <div className="flex items-center">
                  <TrophyFill />
                </div>
              ) : (
                <b>Event:</b>
              )}
            </td>
            <td>{deck['event']}</td>
          </tr>
          <tr>
            <td className="text-fgSecondary dark:text-fgSecondaryDark">
              {isMobile ? (
                <div className="flex items-center">
                  <GeoAltFill />
                </div>
              ) : (
                <b>Location:</b>
              )}
            </td>
            <td>
              <div
                className="link-like"
                onClick={() => handleClick('location', deck['location'])}
              >
                {deck['location']}
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-fgSecondary dark:text-fgSecondaryDark">
              {isMobile ? (
                <div className="flex items-center">
                  <PersonFill />
                </div>
              ) : (
                <b>Player:</b>
              )}
            </td>
            <td>
              <div
                className="link-like"
                onClick={() => handleClick('author', deck['author'])}
              >
                {deck['author']} <br />
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-fgSecondary dark:text-fgSecondaryDark">
              {isMobile ? (
                <div className="flex items-center">
                  <TagFill />
                </div>
              ) : (
                <b>Deck:</b>
              )}
            </td>
            <td>{deck['name']}</td>
          </tr>
        </tbody>
      </table>
      {(tags.superior.length > 0 || tags.base.length > 0) && (
        <TwdResultTags tags={tags} />
      )}
    </>
  );

  return (
    <>
      {isDesktop ? (
        <>
          <div
            className={`flex items-center justify-center rounded-md border-dashed text-lg text-fgSecondary dark:text-fgSecondaryDark ${
              deck['players'] >= 30
                ? 'border-[3px] border-fgSecondary font-bold dark:border-fgSecondaryDark'
                : 'border-2 border-borderPrimary dark:border-borderPrimaryDark'
            }`}
            title="Players"
          >
            <div className="flex items-center">
              <PeopleFill />
            </div>{' '}
            {deck['players']}
          </div>
          {Description}
          <div className="flex flex-row">
            <div className="md:basis-1/2">
              <TwdOpenDeckButton deckid={deck['deckid']} />
            </div>
            <div className="justify-end md:basis-1/2">
              {username && <DeckCloneButton deck={deck} noRedirect />}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-row ">
          <div className="basis-9/12">{Description}</div>
          <div className="basis-1/4">
            <div className="flex flex-col space-y-1">
              <div
                className={`flex items-center  justify-center rounded-md border-dashed text-lg text-fgSecondary dark:text-fgSecondaryDark ${
                  deck['players'] >= 30
                    ? 'border-[3px] border-fgSecondary font-bold dark:border-fgSecondaryDark'
                    : 'border-2 border-borderPrimary dark:border-borderPrimaryDark'
                }`}
              >
                <div className="flex items-center">
                  <PeopleFill />
                </div>{' '}
                {deck['players']}
              </div>
              <TwdOpenDeckButton deckid={deck['deckid']} />
              {username && <DeckCloneButton deck={deck} src="twd" inTwd />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TwdResultDescription;
