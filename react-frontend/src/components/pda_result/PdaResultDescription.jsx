import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Stack } from 'react-bootstrap';
import {
  PdaFavoriteButton,
  TwdOpenDeckButton,
  DeckCloneButton,
} from 'components';
import { useApp, useSearchForms } from 'context';
import defaults from 'components/forms_data/defaultsPdaForm.json';

function PdaResultDescription(props) {
  const { username, isMobile } = useApp();
  const { setPdaFormState } = useSearchForms();

  const navigate = useNavigate();
  const def = JSON.parse(JSON.stringify(defaults));

  const handleAuthorClick = (author) => {
    setPdaFormState((prevState) => ({
      ...def,
      author: author,
    }));
    navigate(
      `/pda?q=${encodeURIComponent(JSON.stringify({ author: author }))}`
    );
  };

  const lastUpdated = new Date(props.deck['timestamp'])
    .toISOString()
    .slice(0, 10);

  return (
    <>
      {isMobile ? (
        <>
          <Row className="pb-1 mx-0">
            <Col xs={8} className="px-1 mx-0">
              <table className="d-inline">
                <tbody>
                  <tr>
                    <td className="d-inline">
                      <b>Deck</b>:
                    </td>
                    <td className="ps-2">
                      {props.deck['name']} <br />
                    </td>
                  </tr>
                  <tr>
                    <td className="d-inline">
                      <b>Author</b>:
                    </td>
                    <td className="ps-2">
                      <div
                        className="link-like"
                        onClick={() => handleAuthorClick(props.deck['author'])}
                      >
                        {props.deck['author']} <br />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="d-inline">
                      <b>Date:</b>
                    </td>
                    <td className="ps-2">{props.deck['creation_date']}</td>
                  </tr>
                  {lastUpdated !== props.deck['creation_date'] && (
                    <tr>
                      <td className="d-inline">
                        <b>Updated:</b>
                      </td>
                      <td className="ps-2">{lastUpdated}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Col>
            <Col xs={4} className="px-1">
              <Stack gap={1}>
                <TwdOpenDeckButton deckid={props.deck['deckid']} inPda />
                {username && (
                  <DeckCloneButton
                    deck={props.deck}
                    activeDeck={{ src: 'shared', deckid: props.deck.deckid }}
                    inPda
                  />
                )}
              </Stack>
              <div className="d-flex justify-content-end py-1">
                <PdaFavoriteButton deck={props.deck} />
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
                  <b>Deck</b>:
                </td>
                <td className="ps-2">
                  {props.deck['name']} <br />
                </td>
              </tr>
              <tr>
                <td className="d-inline">
                  <b>Author</b>:
                </td>
                <td className="ps-2">
                  <div
                    className="link-like"
                    onClick={() => handleAuthorClick(props.deck['author'])}
                  >
                    {props.deck['author']} <br />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="d-inline">
                  <b>Date:</b>
                </td>
                <td className="ps-2">{props.deck['creation_date']}</td>
              </tr>
              {lastUpdated !== props.deck['creation_date'] && (
                <tr>
                  <td className="d-inline">
                    <b>Updated:</b>
                  </td>
                  <td className="ps-2">{lastUpdated}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pt-1 pb-2">
            <PdaFavoriteButton deck={props.deck} />
          </div>
          <Stack gap={1}>
            <TwdOpenDeckButton deckid={props.deck['deckid']} inPda />
            {username && (
              <DeckCloneButton
                deck={props.deck}
                activeDeck={{ src: 'shared', deckid: props.deck.deckid }}
                inPda
              />
            )}
          </Stack>
        </>
      )}
    </>
  );
}

export default PdaResultDescription;
