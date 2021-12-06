import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Stack } from 'react-bootstrap';
import { TwdOpenDeckButton, DeckClone } from 'components';
import { useApp } from 'context';
import defaults from 'components/forms_data/defaultsTwdForm.json';

function TwdResultDescription(props) {
  const { setTwdFormState, username, isMobile } = useApp();
  const navigate = useNavigate();
  const def = JSON.parse(JSON.stringify(defaults));

  const handlePlayerClick = (player) => {
    if (isMobile) {
      navigate(
        `/twd?q=${encodeURIComponent(JSON.stringify({ player: player }))}`
      );
    } else {
      setTwdFormState((prevState) => ({
        ...def,
        player: player,
      }));
    }
  };

  const handleLocationClick = (location) => {
    if (isMobile) {
      navigate(
        `/twd?q=${encodeURIComponent(JSON.stringify({ location: location }))}`
      );
    } else {
      setTwdFormState((prevState) => ({
        ...def,
        location: location,
      }));
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          <Row className="px-0 ps-1 mx-0">
            <Col xs={7} className="px-0 mx-0">
              <table className="d-inline">
                <tbody>
                  <tr>
                    <td className="d-inline">
                      <b>Date:</b>
                    </td>
                    <td className="ps-2">{props.deck['date']}</td>
                  </tr>
                  <tr>
                    <td className="d-inline">
                      <b>Players</b>:
                    </td>
                    <td className="ps-2">{props.deck['players']}</td>
                  </tr>
                  <tr>
                    <td className="d-inline">
                      <b>Location</b>:
                    </td>
                    <td className="ps-2">
                      <div
                        className="link-like"
                        onClick={() =>
                          handleLocationClick(props.deck['location'])
                        }
                      >
                        {props.deck['location']}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="d-inline">
                      <b>Player</b>:
                    </td>
                    <td className="ps-2">
                      <div
                        className="link-like"
                        onClick={() => handlePlayerClick(props.deck['player'])}
                      >
                        {props.deck['player']} <br />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col xs={5} className="px-0 mx-0">
              <Stack gap={1} className="py-2">
                <TwdOpenDeckButton deckid={props.deck['deckid']} />
                {username && (
                  <DeckClone
                    deck={props.deck}
                    activeDeck={{ src: 'twd', deckid: props.deck.deckid }}
                    setShowButtons={() => {}}
                  />
                )}
              </Stack>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <table className="d-inline">
            <tbody>
              <tr>
                <td className="d-inline">
                  <b>Date:</b>
                </td>
                <td className="ps-2">{props.deck['date']}</td>
              </tr>
              <tr>
                <td className="d-inline">
                  <b>Players</b>:
                </td>
                <td className="ps-2">{props.deck['players']}</td>
              </tr>
              <tr>
                <td className="d-inline">
                  <b>Event</b>:
                </td>
                <td className="ps-2">
                  <a href={props.deck['link']}>{props.deck['event']}</a>
                </td>
              </tr>
              <tr>
                <td className="d-inline">
                  <b>Location</b>:
                </td>
                <td className="ps-2">
                  <div
                    className="link-like"
                    onClick={() => handleLocationClick(props.deck['location'])}
                  >
                    {props.deck['location']}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="d-inline">
                  <b>Player</b>:
                </td>
                <td className="ps-2">
                  <div
                    className="link-like"
                    onClick={() => handlePlayerClick(props.deck['player'])}
                  >
                    {props.deck['player']} <br />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="d-inline">
                  <b>Deck</b>:
                </td>
                <td className="ps-2">
                  {props.deck['name']} <br />
                </td>
              </tr>
            </tbody>
          </table>
          <Stack gap={1} className="py-2">
            <TwdOpenDeckButton deckid={props.deck['deckid']} />
            {username && (
              <DeckClone
                deck={props.deck}
                activeDeck={{ src: 'twd', deckid: props.deck.deckid }}
              />
            )}
          </Stack>
        </>
      )}
    </>
  );
}

export default TwdResultDescription;
