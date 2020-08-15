import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

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
    if (state.cardid > 100000 && state.cardid < 202000) {
      props.deckCardAdd(props.deckid, state.cardid);
    } else if (state.cardid) {
      console.log('Error: wrong card id');
    } else {
      console.log('Error: submit with empty forms');
    };
  };

  return (
    <React.Fragment>
      <input
        placeholder='New Card Id'
        type='text'
        id='cardid'
        value={state.cardid}
        onChange={handleChange}/>
      <Button variant='outline-primary' onClick={createNewCard}>
        Add
      </Button>
      <Button variant='outline-primary' onClick={clearFormButton}>
        Clear
      </Button>
    </React.Fragment>
  );
}

export default DeckNewCard;
