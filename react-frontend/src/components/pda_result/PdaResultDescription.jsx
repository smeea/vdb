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

const PdaResultDescription = ({ deck }) => {
  const { username, isDesktop } = useApp();
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
  const lastUpdated = new Date(deck['timestamp']).toISOString().slice(0, 10);

  const Description = (
    <table>
      <tbody>
        <tr>
          <td className="d-inline blue">
            <b>Deck</b>:
          </td>
          <td className="ps-2">{deck['name']}</td>
        </tr>
        <tr>
          <td className="d-inline blue">
            <b>Player</b>:
          </td>
          <td className="ps-2">
            <div
              className="link-like"
              onClick={() => handleAuthorClick(deck['author'])}
            >
              {deck['author']} <br />
            </div>
          </td>
        </tr>
        <tr>
          <td className="d-inline blue">
            <b>Created:</b>
          </td>
          <td className="ps-2">{deck['creation_date']}</td>
        </tr>
        {lastUpdated !== deck['creation_date'] && (
          <tr>
            <td className="d-inline blue">
              <b>Updated:</b>
            </td>
            <td className="ps-2">{lastUpdated}</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const Buttons = (
    <Stack gap={1}>
      <TwdOpenDeckButton deckid={deck['deckid']} inPda />
      {username && (
        <DeckCloneButton
          deck={deck}
          activeDeck={{ src: 'shared', deckid: deck.deckid }}
          inPda
        />
      )}
      <div>
        <PdaFavoriteButton deck={deck} />
      </div>
    </Stack>
  );

  return (
    <>
      {isDesktop ? (
        <>
          <div className="pb-2">{Description}</div>
          {Buttons}
        </>
      ) : (
        <Row className="pb-1 mx-0">
          <Col xs={9} className="px-1 mx-0">
            {Description}
          </Col>
          <Col xs={3} className="px-1">
            {Buttons}
          </Col>
        </Row>
      )}
    </>
  );
};

export default PdaResultDescription;
