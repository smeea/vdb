import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TwdOpenDeckButton from './TwdOpenDeckButton.jsx';
import DeckClone from './DeckClone.jsx';

function TwdResultDescription(props) {
  return (
    <>
      {!props.isMobile ? (
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
            <div className="bp-125">
              <TwdOpenDeckButton
                deckid={props.deck['deckid']}
                setActiveDeck={props.setActiveDeck}
              />
            </div>
            <div className="bp-125">
              { props.username &&
                <DeckClone
                  author={props.deck['player']}
                  name={props.deck['name']}
                  deckid={props.deck['deckid']}
                  getDecks={props.getDecks}
                  setActiveDeck={props.setActiveDeck}
                  setShowButtons={props.setShowButtons}
                />
              }
            </div>
          </div>
        </>
      ) : (
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
                <TwdOpenDeckButton deckid={props.deck['deckid']} />
                { props.username &&
                  <DeckClone
                    author={props.deck['player']}
                    name={props.deck['name']}
                    deckid={props.deck['deckid']}
                    getDecks={props.getDecks}
                    setActiveDeck={props.setActiveDeck}
                    setShowButtons={props.setShowButtons}
                  />
                }
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default TwdResultDescription;
