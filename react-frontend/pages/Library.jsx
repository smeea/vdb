import React, { useState } from 'react';

import ResultLibrary from './components/ResultLibrary.jsx';
import SearchLibraryForm from './components/SearchLibraryForm.jsx';
import DeckPreview from './components/DeckPreview.jsx';
import DeckSelectDeck from './components/DeckSelectDeck.jsx';

function Library(props) {
  const [results, setResults] = useState([]);
  const [sortMethod, setSortMethod] = useState('Default');

  const [formState, setFormState] = useState({
    text: '',
    type: 'ANY',
    discipline: 'ANY',
    blood: 'ANY',
    bloodmoreless: 'le',
    pool: 'ANY',
    poolmoreless: 'le',
    clan: 'ANY',
    sect: 'ANY',
    title: 'ANY',
    traits: {
      'intercept': false,
      'stealth': false,
      'bleed': false,
      'strength': false,
      'dodge': false,
      'optional maneuver': false,
      'additional strike': false,
      aggravated: false,
      prevent: false,
      'optional press': false,
      'combat ends': false,
      'bounce bleed': false,
      'black hand': false,
      seraph: false,
      anarch: false,
      infernal: false,
    },
    set: 'ANY',
  });

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
          <ResultLibrary
            showImage={props.showImage}
            toggleImage={props.toggleImage}
            sortMode={true}
            deckCardAdd={props.deckCardAdd}
            cards={results}
            activeDeck={props.activeDeck}
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
        </div>
        <div className='col-md-12 col-lg-3 col-xl-3 px-1 px-xl-2'>
          <SearchLibraryForm
            setResults={setResults}
            formState={formState}
            setFormState={setFormState}
          />
        </div>
      </div>
    </div>
  );
}

export default Library;
