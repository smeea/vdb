import React, { useState, useEffect } from 'react';

import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryText from './ResultLibraryText.jsx';
import ResultLibraryFormSort from './ResultLibraryFormSort.jsx';
import resultLibrarySort from './resultLibrarySort.js';

function SearchLibraryBody(props) {
  let resultTrClass='library-result-even';

  const [hiddenState, setHiddenState] = useState({});

  const toggleHidden = id => {
    if (hiddenState[id] == undefined || hiddenState[id] == true) {
      setHiddenState(prevState => ({
        ...prevState,
        [id]: false
      }));
    } else {
      setHiddenState(prevState => ({
        ...prevState,
        [id]: true
      }));
    }
  };

  const cards = props.resultCards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    return (
      <React.Fragment key={index}>
      <tr className={resultTrClass}>
        <ResultLibraryCost valueBlood={card['Blood Cost']} valuePool={card['Pool Cost']} />
        <ResultLibraryType cardtype={card['Type']} />
        <ResultLibraryDisciplines value={card['Discipline']} />
        <ResultLibraryName id={card['Id']} toggleHidden={toggleHidden} value={card['Name']} ban={card['Banned']} />
        <ResultLibraryClan value={card['Clan']} />
        <ResultLibraryBurn value={card['Burn Option']} />
      </tr>
        <ResultLibraryText resultTrClass={resultTrClass} toggleHidden={toggleHidden} hiddenState={hiddenState} card={card} />
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
      <ResultLibraryFormSort value={sortMethod} onChange={handleChange} />
      <table width='100%' className='search-library-table'>
        <SearchLibraryBody resultCards={sortedCards} />
      </table>
    </React.Fragment>
  );
}

export default ResultLibrary;
