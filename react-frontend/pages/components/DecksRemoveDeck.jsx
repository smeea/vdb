import React, { useEffect, useState } from 'react';

function DecksRemoveDeck(props) {
  const deck = props.activeDeck;
  const removeDeck = event => {

    if (deck) {
      const url = 'http://127.0.0.1:5001/api/decks/remove';
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({deckid: deck}),
      };

      fetch(url, options);
      console.log(options.body);
      console.log('Remove deck: ', deck);

    } else {
      console.log('Error: no deck selected');
    };

  };

  return (
    <div>
      <button className="btn btn-outline-secondary" type="button" onClick={removeDeck}>
        REMOVE
      </button>
    </div>
  );
}

export default DecksRemoveDeck;
