import React, { useState } from 'react';

function DeckNewCard(props) {
  const [state, setState] = useState({
    cardid: '',
  });

  const handleChange = event => {
    const {id, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const clearFormButton = event => {
    setState({cardid: ''});
  };

  const createNewCard = event => {
    if (state.cardid) {
      props.deckCardAdd(props.deckid, state.cardid);

    } else {
      console.log('Error: submit with empty forms');
    };
  };

  return (
    <div>
      <input
        placeholder='New Card Id'
        type='text'
        id='cardid'
        value={state.cardid}
        onChange={handleChange}/>
      <button className='btn btn-outline-secondary' type='button' onClick={createNewCard}>
        ADD
      </button>
      <button className='btn btn-outline-secondary' type='button' onClick={clearFormButton}>
        CLEAR
      </button>
    </div>
  );
}

export default DeckNewCard;
