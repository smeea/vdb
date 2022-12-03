import React from 'react';
import { Col } from 'react-bootstrap';
import { DiffCrypt, DiffLibrary } from 'components';

const DeckPublicDiff = ({ deckFrom, deckTo }) => {
  return (
    <div className="flex flex-row">
      <Col md={7} className="">
        <DiffCrypt
          isEditable={false}
          cardsFrom={deckFrom.crypt}
          cardsTo={deckTo.crypt}
        />
      </Col>
      <Col md={5} className="">
        <DiffLibrary
          isEditable={false}
          cardsFrom={deckFrom.library}
          cardsTo={deckTo.library}
        />
      </Col>
    </div>
  );
};

export default DeckPublicDiff;
