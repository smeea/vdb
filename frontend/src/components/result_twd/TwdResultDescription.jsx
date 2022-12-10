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
            <td className="blue">
              {isMobile ? (
                <div className="flex items-center">
                  <CalendarEvent />
                </div>
              ) : (
                <b>Date:</b>
              )}
            </td>
            <td className="pl-2">{deck['creation_date']}</td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ? (
                <div className="flex items-center">
                  <TrophyFill />
                </div>
              ) : (
                <b>Event:</b>
              )}
            </td>
            <td className="pl-2">{deck['event']}</td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ? (
                <div className="flex items-center">
                  <GeoAltFill />
                </div>
              ) : (
                <b>Location:</b>
              )}
            </td>
            <td className="pl-2">
              <div
                className="link-like"
                onClick={() => handleClick('location', deck['location'])}
              >
                {deck['location']}
              </div>
            </td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ? (
                <div className="flex items-center">
                  <PersonFill />
                </div>
              ) : (
                <b>Player:</b>
              )}
            </td>
            <td className="pl-2">
              <div
                className="link-like"
                onClick={() => handleClick('author', deck['author'])}
              >
                {deck['author']} <br />
              </div>
            </td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ? (
                <div className="flex items-center">
                  <TagFill />
                </div>
              ) : (
                <b>Deck:</b>
              )}
            </td>
            <td className="pl-2">{deck['name']}</td>
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
            className={`text-blue mx-1 mt-1 mb-2 flex items-center justify-center text-lg ${
              deck['players'] >= 30
                ? 'bold border-dashed-thick'
                : 'border-dashed'
            }`}
            title="Players"
          >
            <div className="pr-1 flex items-center">
              <PeopleFill />
            </div>{' '}
            {deck['players']}
          </div>
          {Description}
          <div className="flex flex-row p-2">
            <div className="pl-2 pr-1 md:basis-1/2">
              <TwdOpenDeckButton deckid={deck['deckid']} />
            </div>
            <div className="pl-1 pr-2 md:basis-1/2">
              {username && <DeckCloneButton deck={deck} noRedirect />}
            </div>
          </div>
        </>
      ) : (
        <div className="mx-0 flex flex-row pb-1">
          <div className="mx-0 basis-9/12 px-1">{Description}</div>
          <div className="basis-1/4 px-1">
            <div className="flex flex-col space-y-1">
              <div
                className={`text-blue mx-1 mb-1 flex items-center justify-center text-lg ${
                  deck['players'] >= 30
                    ? 'bold border-dashed-thick'
                    : 'border-dashed'
                }`}
              >
                <div className="pr-1 flex items-center">
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
