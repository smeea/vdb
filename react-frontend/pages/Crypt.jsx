import React, { useState } from 'react';

import ResultCrypt from './components/ResultCrypt.jsx';
import SearchCryptForm from './components/SearchCryptForm.jsx';
import DeckPreview from './components/DeckPreview.jsx';
import DeckSelectDeck from './components/DeckSelectDeck.jsx';

function Crypt(props) {
  const [results, setResults] = useState([]);
  const [sortMethod, setSortMethod] = useState('Default');
  return (
    <div className='container px-0 py-xl-2 px-xl-2'>
      <div className='row mx-0'>
        <div className='col-md-12 col-lg-3 col-xl-3 px-1 px-xl-2'>

          { Object.keys(props.decks).length > 0 &&
            <DeckSelectDeck
              decks={props.decks}
              activeDeck={props.activeDeck}
              setActiveDeck={props.setActiveDeck}
            />
          }

          { props.activeDeck &&
            <DeckPreview
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              deck={props.decks[props.activeDeck]}
              getDecks={props.getDecks}
              deckCardChange={props.deckCardChange}
            />
          }
        </div>

        <div className='col-md-12 col-lg-6 col-xl-6 px-1 px-xl-2'>
          <ResultCrypt
            showImage={props.showImage}
            toggleImage={props.toggleImage}
            deckCardAdd={props.deckCardAdd}
            cards={results}
            activeDeck={props.activeDeck}
            sortMode={true}
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
        </div>
        <div className='col-md-12 col-lg-3 col-xl-3 px-1 px-xl-2'>
          <SearchCryptForm setResults={setResults} />
        </div>
      </div>
    </div>
  );
}

export default Crypt;
