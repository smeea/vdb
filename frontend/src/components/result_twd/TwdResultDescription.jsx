import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Stack } from 'react-bootstrap';
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
                <div className="d-flex align-items-center">
                  <CalendarEvent />
                </div>
              ) : (
                <b>Date:</b>
              )}
            </td>
            <td className="ps-2">{deck['creation_date']}</td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ? (
                <div className="d-flex align-items-center">
                  <TrophyFill />
                </div>
              ) : (
                <b>Event:</b>
              )}
            </td>
            <td className="ps-2">{deck['event']}</td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ? (
                <div className="d-flex align-items-center">
                  <GeoAltFill />
                </div>
              ) : (
                <b>Location:</b>
              )}
            </td>
            <td className="ps-2">
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
                <div className="d-flex align-items-center">
                  <PersonFill />
                </div>
              ) : (
                <b>Player:</b>
              )}
            </td>
            <td className="ps-2">
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
                <div className="d-flex align-items-center">
                  <TagFill />
                </div>
              ) : (
                <b>Deck:</b>
              )}
            </td>
            <td className="ps-2">{deck['name']}</td>
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
            className={`d-flex justify-content-center align-items-center text-lg mx-1 mt-1 mb-2text-blue ${
              deck['players'] >= 30
                ? 'bold border-dashed-thick'
                : 'border-dashed'
            }`}
            title="Players"
          >
            <div className="d-flex align-items-center pe-1">
              <PeopleFill />
            </div>{' '}
            {deck['players']}
          </div>
          {Description}
          <Row className="p-2">
            <Col md={6} className="ps-2 pe-1">
              <TwdOpenDeckButton deckid={deck['deckid']} />
            </Col>
            <Col md={6} className="ps-1 pe-2">
              {username && <DeckCloneButton deck={deck} noRedirect />}
            </Col>
          </Row>
        </>
      ) : (
        <Row className="pb-1 mx-0">
          <Col xs={9} className="px-1 mx-0">
            {Description}
          </Col>
          <Col xs={3} className="px-1">
            <Stack gap={1}>
              <div
                className={`d-flex justify-content-center align-items-center text-lg mx-1 mb-1text-blue ${
                  deck['players'] >= 30
                    ? 'bold border-dashed-thick'
                    : 'border-dashed'
                }`}
              >
                <div className="d-flex align-items-center pe-1">
                  <PeopleFill />
                </div>{' '}
                {deck['players']}
              </div>
              <TwdOpenDeckButton deckid={deck['deckid']} />
              {username && <DeckCloneButton deck={deck} src="twd" inTwd />}
            </Stack>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TwdResultDescription;
