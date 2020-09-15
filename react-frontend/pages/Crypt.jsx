import React, { useState } from 'react';

import ResultCrypt from './components/ResultCrypt.jsx';
import SearchCryptForm from './components/SearchCryptForm.jsx';
import DeckPreview from './components/DeckPreview.jsx';
import DeckSelectDeck from './components/DeckSelectDeck.jsx';

function Crypt(props) {
  const [results, setResults] = useState([]);
  const [sortMethod, setSortMethod] = useState('Default');
  const [formState, setFormState] = useState({
    text: '',
    disciplines: {
      Abombwe: 0,
      Animalism: 0,
      Auspex: 0,
      Celerity: 0,
      Chimerstry: 0,
      Daimoinon: 0,
      Dementation: 0,
      Dominate: 0,
      Fortitude: 0,
      Melpominee: 0,
      Mytherceria: 0,
      Necromancy: 0,
      Obeah: 0,
      Obfuscate: 0,
      Obtenebration: 0,
      Potence: 0,
      Presence: 0,
      Protean: 0,
      Quietus: 0,
      Sanguinus: 0,
      Serpentis: 0,
      Spiritus: 0,
      Temporis: 0,
      Thanatosis: 0,
      Thaumaturgy: 0,
      Valeren: 0,
      Vicissitude: 0,
      Visceratika: 0,
    },
    virtues: {
      Defense: 0,
      Innocence: 0,
      Judgment: 0,
      Martyrdom: 0,
      Redemption: 0,
      Vengeance: 0,
      Vision: 0,
    },
    capacity: 'ANY',
    capacitymoreless: 'le',
    clan: 'ANY',
    sect: 'ANY',
    votes: 'ANY',
    titles: {
      primogen: false,
      prince: false,
      justicar: false,
      innercircle: false,
      baron: false,
      '1 votes': false,
      '2 votes': false,
      bishop: false,
      archbishop: false,
      priscus: false,
      cardinal: false,
      regent: false,
      magaji: false,
    },
    group: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    },
    traits: {
      '1 intercept': false,
      '1 stealth': false,
      '1 bleed': false,
      '2 bleed': false,
      '1 strength': false,
      '1 strength': false,
      'additional strike': false,
      'optional maneuver': false,
      'optional press': false,
      prevent: false,
      aggravated: false,
      'enter combat': false,
      'black hand': false,
      seraph: false,
      infernal: false,
      'red list': false,
      flight: false,
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
          <ResultCrypt
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
          <SearchCryptForm
            setResults={setResults}
            formState={formState}
            setFormState={setFormState}
          />
        </div>
      </div>
    </div>
  );
}

export default Crypt;
