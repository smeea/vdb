import React, { useState } from 'react';

import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptText from './ResultCryptText.jsx';

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
}

function ResultCrypt(props) {
  return (
    <React.Fragment>
      <table className='search-crypt-table'>
        <SearchCryptBody resultCards={props.cards} />
      </table>
    </React.Fragment>
  );
}

export default ResultCrypt;
