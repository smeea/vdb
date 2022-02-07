import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Stack } from 'react-bootstrap';
import { TwdOpenDeckButton, DeckClone } from 'components';
import { useApp, useSearchForms } from 'context';
import defaults from 'components/forms_data/defaultsPdaForm.json';

function PdaResultDescription(props) {
  const { username, isMobile } = useApp();
  const { setPdaFormState } = useSearchForms();

  const navigate = useNavigate();
  const def = JSON.parse(JSON.stringify(defaults));

  const handlePlayerClick = (player) => {
    if (isMobile) {
      navigate(
        `/pda?q=${encodeURIComponent(JSON.stringify({ player: player }))}`
      );
    } else {
      setPdaFormState((prevState) => ({
        ...def,
        player: player,
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
                      <b>Author</b>:
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
                <TwdOpenDeckButton deckid={props.deck['deckid']} inPda />
                {username && (
                  <DeckClone
                    deck={props.deck}
                    activeDeck={{ src: 'shared', deckid: props.deck.deckid }}
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
                  <b>Author</b>:
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
            <TwdOpenDeckButton deckid={props.deck['deckid']} inPda />
            {username && (
              <DeckClone
                deck={props.deck}
                activeDeck={{ src: 'shared', deckid: props.deck.deckid }}
              />
            )}
          </Stack>
        </>
      )}
    </>
  );
}

export default PdaResultDescription;
