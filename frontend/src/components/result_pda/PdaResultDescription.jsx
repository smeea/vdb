import React from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarEvent from 'assets/images/icons/calendar-event.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import TagFill from 'assets/images/icons/tag-fill.svg';
import {
  TwdResultTags,
  PdaFavoriteButton,
  TwdOpenDeckButton,
  DeckCloneButton,
} from 'components';
import { useApp, clearSearchForm, searchPdaForm } from 'context';
import { useTags } from 'hooks';

const PdaResultDescription = ({ deck }) => {
  const { username, isMobile, isDesktop } = useApp();
  const tags = useTags(deck.crypt, deck.library);
  const navigate = useNavigate();

  const handleClick = (author) => {
    clearSearchForm('pda');
    searchPdaForm.author = author;
    navigate(
      `/pda?q=${encodeURIComponent(JSON.stringify({ author: author }))}`
    );
  };
  const lastUpdated = new Date(deck['timestamp']).toISOString().slice(0, 10);

  const Description = (
    <>
      <table>
        <tbody>
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
            <td className="ps-2">{deck['name']}</td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ? (
                <div className="flex items-center">
                  <PersonFill />
                </div>
              ) : (
                <b>Author:</b>
              )}
            </td>
            <td className="ps-2">
              <div
                className="link-like"
                onClick={() => handleClick(deck['author'])}
              >
                {deck['author']} <br />
              </div>
            </td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ? (
                <div className="flex items-center">
                  <CalendarEvent />
                </div>
              ) : (
                <b>Created:</b>
              )}
            </td>
            <td className="ps-2">{deck['creation_date']}</td>
          </tr>
          {lastUpdated !== deck['creation_date'] && (
            <tr>
              <td className="blue">
                {isMobile ? (
                  <div className="flex items-center">
                    <CalendarEvent />
                  </div>
                ) : (
                  <b>Updated:</b>
                )}
              </td>
              <td className="ps-2">{lastUpdated}</td>
            </tr>
          )}
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
          {Description}
          <div className="flex space-x-1 px-1">
            <div className="md:basis-1/2">
              <TwdOpenDeckButton deckid={deck['deckid']} />
            </div>
            <div className="md:basis-1/2">
              {username && <DeckCloneButton deck={deck} noRedirect />}
            </div>
          </div>
          <div className="p-1">
            <PdaFavoriteButton deck={deck} />
          </div>
        </>
      ) : (
        <div className="mx-0 flex flex-row pb-1">
          <div className="mx-0 basis-9/12 px-1">{Description}</div>
          <div className="basis-1/4 px-1">
            <div className="flex flex-col space-y-1">
              <TwdOpenDeckButton deckid={deck['deckid']} />
              {username && <DeckCloneButton deck={deck} noRedirect />}
              <div>
                <PdaFavoriteButton deck={deck} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PdaResultDescription;
