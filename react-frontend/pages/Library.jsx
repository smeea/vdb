import React, { useState } from 'react';
import ResultLibrary from './components/ResultLibrary.jsx';
import SearchLibraryForm from './components/SearchLibraryForm.jsx';
import DeckPreview from './components/DeckPreview.jsx';

function Library(props) {
  const [cards, setCards] = useState([]);

  const setResults = (cards) => {
    setCards(cards);
  };

  return (
    <div className='container py-xl-3 px-0 px-xl-2'>
      <div className='row mx-0'>
        <div className='col-md-12 col-lg-3 col-xl-3 px-1 px-xl-2'>
          { props.addMode == true &&
            <DeckPreview addMode={props.addMode} deckid={props.deckid} deck={props.deck} getDecks={props.getDecks} />
          }
        </div>
        <div className='col-md-12 col-lg-6 col-xl-6 px-1 px-xl-2'>
          <ResultLibrary sortMode={true} addMode={props.addMode} cardAdd={props.cardAdd} cards={cards}/>
        </div>
        <div className='col-md-12 col-lg-3 col-xl-3 px-1 px-xl-2'>
          <SearchLibraryForm setResults={setResults} />
        </div>
      </div>
    </div>
  );
}

export default Library;
