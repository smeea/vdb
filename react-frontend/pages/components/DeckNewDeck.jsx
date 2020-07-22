import React, { useEffect, useState } from 'react';

function DecksNewDeck(props) {
  const handleNewDeckButton = props.handleNewDeckButton;
  const [state, setState] = useState({
    deckname: '',
  });

  const handleChange = event => {
    const {id, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const clearFormButton = event => {
    setState({deckname: ''});
  };

  const createNewDeck = event => {

    if (state.deckname) {
      const url = 'http://127.0.0.1:5001/api/decks/create';
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      };

      fetch(url, options);

    } else {
      console.log('Error: submit with empty forms');
    };

  };

  return (
    <div>
      <input
        placeholder="New Deck Name"
        type="text"
        id="deckname"
        value={state.deckname}
        onChange={handleChange}/>
      <button className="btn btn-outline-secondary" type="button" onClick={createNewDeck}>
        CREATE
      </button>
      <button className="btn btn-outline-secondary" type="button" onClick={clearFormButton}>
        CLEAR
      </button>
    </div>
  );
}

export default DecksNewDeck;
