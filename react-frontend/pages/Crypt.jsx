import React, { useState } from 'react';
import ResultCrypt from './components/ResultCrypt.jsx';
import SearchCryptForm from './components/SearchCryptForm.jsx';
import DeckPreview from './components/DeckPreview.jsx';

function Crypt(props) {
  const [showImage, setShowImage] = useState(false);
  const toggleImage = () => setShowImage(!showImage);

  const [cards, setCards] = useState([]);

  const setResults = (cards) => {
    setCards(cards);
  };

  return (
    <div className='container px-0 py-xl-2 px-xl-2'>
      <div className='row mx-0'>
        <div className='col-md-12 col-lg-3 col-xl-3 px-1 px-xl-2'>
          { props.addMode == true &&
            <DeckPreview showImage={showImage} toggleImage={toggleImage} addMode={props.addMode} deckid={props.deckid} deck={props.deck} getDecks={props.getDecks} />
          }
        </div>
        <div className='col-md-12 col-lg-6 col-xl-6 px-1 px-xl-2'>
          <ResultCrypt showImage={showImage} toggleImage={toggleImage} sortMode={true} addMode={props.addMode} cardAdd={props.cardAdd} cards={cards}/>
        </div>
        <div className='col-md-12 col-lg-3 col-xl-3 px-1 px-xl-2'>
          <SearchCryptForm setResults={setResults} />
        </div>
      </div>
    </div>
  );
}

export default Crypt;
