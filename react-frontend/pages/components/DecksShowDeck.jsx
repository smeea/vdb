import React, { useEffect, useState } from 'react';
import { CryptDeckResults } from './CryptResults.jsx';
import { LibraryDeckResults } from './LibraryResults.jsx';

function DecksNewCard(props) {
  const deckid = props.deckid;
  const deckCardAdd=props.deckCardAdd;

  const [state, setState] = useState({
    cardid: '',
  });

  const handleChange = event => {
    const { cardid, value } = event.target;
    setState({cardid: value});
  };

  const clearFormButton = event => {
    setState({cardid: ''});
  };

  const createNewCard = event => {
    if (state.cardid) {
      deckCardAdd(deckid, state.cardid);

    } else {
      console.log('Error: submit with empty forms');
    };
  };

  return (
    <div>
      <input
        placeholder="New Card Id"
        type="text"
        id="cardid"
        value={state.cardid}
        onChange={handleChange}/>
      <button className="btn btn-outline-secondary" type="button" onClick={createNewCard}>
        ADD
      </button>
      <button className="btn btn-outline-secondary" type="button" onClick={clearFormButton}>
        CLEAR
      </button>
    </div>
  );
}

function DecksShowDeck(props) {

  if (props.deck) {
    const deck = props.deck;
    const crypt = [];
    // const library = [];
    const library = {
      'Action Modifier': [],
      'Ally': [],
      'Combat': [],
      'Conviction': [],
      'Equipment': [],
      'Event': [],
      'Master': [],
      'Political Action': [],
      'Power': [],
      'Reaction': [],
      'Retainer': [],
      'Other': [],
    }

    for (const card in deck.crypt) {
      crypt.push([deck.crypt[card].c, deck.crypt[card].q]);
    }

    let crypt_total = 0;
    for (const card of crypt) {
      crypt_total += card[1];
    }

    for (const card in deck.library) {
      if (deck.library[card].c['Type'] == 'Action') {
        library['Action'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Action Modifier') {
        library['Action Modifier'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Ally') {
        library['Ally'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Combat') {
        library['Combat'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Conviction') {
        library['Conviction'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Equipment') {
        library['Equipment'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Event') {
        library['Event'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Master') {
        library['Master'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Political Action') {
        library['Political Action'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Power') {
        library['Power'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Reaction') {
        library['Reaction'].push([deck.library[card].c, deck.library[card].q]);
      } else if (deck.library[card].c['Type'] == 'Retainer') {
        library['Retainer'].push([deck.library[card].c, deck.library[card].q]);
      } else {
        library['Other'].push([deck.library[card].c, deck.library[card].q]);
      }
    }

    const LibraryDeck = Object.keys(library).map((cardtype, index) => {
      if (library[cardtype].length > 0) {
        let total = 0;
        for (const card of library[cardtype]) {
          total += card[1];
        }

        return (
          <LibraryDeckResults key={index} deckCardChange={props.deckCardChange} deckid={deck.deckid} cards={library[cardtype]} cardtype={cardtype} total={total} />
        );
      }
    });

    return (
      <div>
        Deck Name: {deck.name}
        <DecksNewCard deckCardAdd={props.deckCardAdd} deckid={deck.deckid} />
        <CryptDeckResults total={crypt_total} deckCardChange={props.deckCardChange} deckid={deck.deckid} cards={crypt} />
        <br />
        {LibraryDeck}
      </div>
    );
  } else {
    return (
      <div></div>
    );
  };
}

export default DecksShowDeck;
