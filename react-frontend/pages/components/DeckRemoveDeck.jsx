import React from 'react';

function DeckRemoveDeck(props) {
  const removeDeck = event => {

    if (props.activeDeck) {
      const url = 'http://127.0.0.1:5001/api/decks/remove';
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({deckid: props.activeDeck}),
      };
      fetch(url, options);
      console.log('Remove deck: ', props.activeDeck);

    } else {
      console.log('Error: no deck selected');
    };
  };

  return (
    <React.Fragment>
      <button className='btn btn-outline-secondary' type='button' onClick={removeDeck}>
        REMOVE
      </button>
    </React.Fragment>
  );
}

export default DeckRemoveDeck;
