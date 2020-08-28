import React, { useState, useEffect } from 'react';

import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibrarySortForm from './ResultLibrarySortForm.jsx';
import resultLibrarySort from './resultLibrarySort.js';
import ResultAddCard from './ResultAddCard.jsx';

function SearchLibraryBody(props) {
  let resultTrClass='library-result-even';


  const cards = props.resultCards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          { props.addMode &&
            <ResultAddCard cardAdd={props.cardAdd} cardid={card['Id']}/>
          }
          <ResultLibraryCost valueBlood={card['Blood Cost']} valuePool={card['Pool Cost']} />
          <ResultLibraryType cardtype={card['Type']} />
          <ResultLibraryDisciplines value={card['Discipline']} />
          <ResultLibraryName id={card['Id']} value={card['Name']} ban={card['Banned']} cardAdd={props.cardAdd} card={card} />
          <ResultLibraryClan value={card['Clan']} />
          <ResultLibraryBurn value={card['Burn Option']} />
        </tr>
      </React.Fragment>
    );
  });

  return <tbody>{cards}</tbody>;
}

function ResultLibrary(props) {
  const [sortedCards, setSortedCards] = useState([]);
  const [sortMethod, setSortMethod] = useState('Default');

  const handleChange = event => {
    const method = event.target.value;
    setSortMethod(method);
    setSortedCards(() => resultLibrarySort(props.cards, method));
  };

  useEffect(() => {
    setSortedCards(() => resultLibrarySort(props.cards, sortMethod));
  });

  return (
    <React.Fragment>
      {
        props.deck == undefined && sortedCards.length > 0 &&
          <ResultLibrarySortForm value={sortMethod} onChange={handleChange} />
      }
      <table className='search-library-table'>
        <SearchLibraryBody cardAdd={props.cardAdd} addMode={props.addMode} resultCards={sortedCards} />
      </table>
    </React.Fragment>
  );
}

export default ResultLibrary;
