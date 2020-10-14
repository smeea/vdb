import React from 'react';
import { Row, Col } from 'react-bootstrap';

import DeckShowCrypt from './DeckShowCrypt.jsx';
import DeckShowLibrary from './DeckShowLibrary.jsx';
import DeckDraw from './DeckDraw.jsx';
import DeckNewCryptCard from './DeckNewCryptCard.jsx';
import DeckNewLibraryCard from './DeckNewLibraryCard.jsx';
import DeckChangeName from './DeckChangeName.jsx';
import DeckChangeAuthor from './DeckChangeAuthor.jsx';
import DeckChangeDescription from './DeckChangeDescription.jsx';
import DeckClone from './DeckClone.jsx';
import DeckRemove from './DeckRemove.jsx';
import DeckCopyUrlButton from './DeckCopyUrlButton.jsx';

function DeckShow(props) {
  const isAuthor = props.username == props.deck.owner;

  return (
    <Row>
      <Col md={12} lg={9}>
        <DeckChangeName
          name={props.deck.name}
          deckUpdate={props.deckUpdate}
          deckid={props.deck.deckid}
          isAuthor={isAuthor}
        />
        <DeckChangeDescription
          description={props.deck.description}
          deckUpdate={props.deckUpdate}
          deckid={props.deck.deckid}
          isAuthor={isAuthor}
        />
        <DeckChangeAuthor
          author={props.deck.author}
          deckUpdate={props.deckUpdate}
          deckid={props.deck.deckid}
          isAuthor={isAuthor}
        />
      </Col>
      <Col md={12} lg={3}>
        <div>
          {isAuthor && props.deck && (
            <DeckRemove deck={props.deck} setActiveDeck={props.setActiveDeck} />
          )}
        </div>
        <div>
          <DeckCopyUrlButton value={props.deck.deckid} />
        </div>
        <div>
          {props.username && (
            <DeckClone
              author={props.deck.author}
              name={props.deck.name}
              deckid={props.deck.deckid}
              getDecks={props.getDecks}
              setActiveDeck={props.setActiveDeck}
            />
          )}
        </div>
        <div>
          <DeckDraw crypt={props.deck.crypt} library={props.deck.library} />
        </div>
      </Col>
      <Col md={12} lg={7}>
        <DeckShowCrypt
          deckCardAdd={props.deckCardAdd}
          deckCardChange={props.deckCardChange}
          deckid={props.deck.deckid}
          cards={props.deck.crypt}
          showImage={props.showImage}
          toggleImage={props.toggleImage}
          isAuthor={isAuthor}
        />
      </Col>
      <Col md={12} lg={5}>
        <DeckShowLibrary
          deckCardAdd={props.deckCardAdd}
          deckCardChange={props.deckCardChange}
          deckid={props.deck.deckid}
          cards={props.deck.library}
          showImage={props.showImage}
          toggleImage={props.toggleImage}
          isAuthor={isAuthor}
        />
      </Col>
    </Row>
  );
}

export default DeckShow;
