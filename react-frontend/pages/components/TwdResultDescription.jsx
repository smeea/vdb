import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import TwdOpenDeckButton from './TwdOpenDeckButton.jsx';
import DeckClone from './DeckClone.jsx';
import AppContext from '../../context/AppContext.js';

function TwdResultDescription(props) {
  const { setTwdFormState, username, isMobile } = useContext(AppContext);

  const handlePlayerClick = (player) => {
    setTwdFormState((prevState) => ({
      ...prevState,
      player: player,
    }));
  };

  const handleLocationClick = (location) => {
    setTwdFormState((prevState) => ({
      ...prevState,
      location: location,
    }));
  };

  return (
    <>
      {isMobile ? (
        <>
          <Row className="px-0 pl-1 mx-0">
            <Col xs={7} className="px-0 mx-0">
              <table className="d-inline">
                <tbody>
                  <tr>
                    <td className="d-inline">
                      <b>Date:</b>
                    </td>
                    <td className="pl-2">{props.deck['date']}</td>
                  </tr>
                  <tr>
                    <td className="d-inline">
                      <b>Players</b>:
                    </td>
                    <td className="pl-2">{props.deck['players']}</td>
                  </tr>
                  <tr>
                    <td className="d-inline">
                      <b>Location</b>:
                    </td>
                    <td className="pl-2">{props.deck['location']}</td>
                  </tr>
                  <tr>
                    <td className="d-inline">
                      <b>Player</b>:
                    </td>
                    <td className="pl-2">
                      {props.deck['player']} <br />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col xs={5} className="px-0 mx-0">
              <div className="py-2">
                <div className="button-block">
                  <TwdOpenDeckButton deckid={props.deck['deckid']} />
                </div>
                <div className="button-block">
                  {username && (
                    <DeckClone
                      deck={props.deck}
                      activeDeck={{ src: 'twd', deckid: props.deck.deckid }}
                      setShowButtons={props.setShowButtons}
                    />
                  )}
                </div>
              </div>
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
                <td className="pl-2">{props.deck['date']}</td>
              </tr>
              <tr>
                <td className="d-inline">
                  <b>Players</b>:
                </td>
                <td className="pl-2">{props.deck['players']}</td>
              </tr>
              <tr>
                <td className="d-inline">
                  <b>Event</b>:
                </td>
                <td className="pl-2">
                  <a href={props.deck['link']}>{props.deck['event']}</a>
                </td>
              </tr>
              <tr>
                <td className="d-inline">
                  <b>Location</b>:
                </td>
                <td className="pl-2">
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
                <td className="pl-2">
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
                <td className="pl-2">
                  {props.deck['name']} <br />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="py-2">
            <div className="button-block">
              <TwdOpenDeckButton deckid={props.deck['deckid']} />
            </div>
            <div className="button-block">
              {username && (
                <DeckClone
                  deck={props.deck}
                  activeDeck={{ src: 'twd', deckid: props.deck.deckid }}
                  setShowButtons={props.setShowButtons}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TwdResultDescription;
