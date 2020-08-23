import React, { useState, useEffect } from 'react';

import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptText from './ResultCryptText.jsx';
import ResultCryptFormSort from './ResultCryptFormSort.jsx';
import resultCryptSort from './resultCryptSort.js';

function SearchCryptBody(props) {
  let resultTrClass='crypt-result-even';

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

  if (props.resultCards) {
    const cards = props.resultCards.map((card, index) => {
      if (resultTrClass == 'crypt-result-even') {
        resultTrClass = 'crypt-result-odd';
      } else {
        resultTrClass = 'crypt-result-even';
      }

      return (
        <React.Fragment key={index}>
          <tr className={resultTrClass}>
            <ResultCryptCapacity value={card['Capacity']} />
            <ResultCryptDisciplines value={card['Disciplines']} />
            <ResultCryptName id={card['Id']} toggleHidden={toggleHidden} value={card['Name']} adv={card['Adv']} ban={card['Banned']} />
            <ResultCryptClan value={card['Clan']} />
            <ResultCryptGroup value={card['Group']} />
          </tr>
          <ResultCryptText resultTrClass={resultTrClass} toggleHidden={toggleHidden} hiddenState={hiddenState} card={card} />
        </React.Fragment>
      );
    });

    return <tbody>{cards}</tbody>;
  } else {
    return null;
  }
}

function ResultCrypt(props) {
  const [sortedCards, setSortedCards] = useState([]);
  const [sortMethod, setSortMethod] = useState('Default');

  const handleChange = event => {
    const method = event.target.value;
    setSortMethod(method);
    setSortedCards(() => resultCryptSort(props.cards, method));
  };

  useEffect(() => {
    setSortedCards(() => resultCryptSort(props.cards, sortMethod));
  });

  return (
    <React.Fragment>
      {
        props.deck == undefined && sortedCards.length > 0 &&
          <ResultCryptFormSort value={sortMethod} onChange={handleChange} />
      }
      <table className='search-crypt-table'>
        <SearchCryptBody resultCards={sortedCards} />
      </table>
    </React.Fragment>
  );
}

export default ResultCrypt;
