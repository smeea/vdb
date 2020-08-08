import React, { useState } from 'react';

import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';

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

    const sets = Object.keys(card['Set']).map((k, index) => {
      return(
        <div className='sets' key={index}>
          {k}: {card['Set'][k]}
        </div>
      );
    });

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <ResultCryptCapacity value={card['Capacity']} />
          <ResultCryptDisciplines value={card['Disciplines']} />
          <ResultCryptName id={card['Id']} toggleHidden={toggleHidden} value={card['Name']} adv={card['Adv']} ban={card['Banned']} />
          <ResultCryptClan value={card['Clan']} />
          <ResultCryptGroup value={card['Group']} />
        </tr>
        { hiddenState[card['Id']] == undefined || hiddenState[card['Id']] == true ? (
          null
        ) : (
          <tr className={resultTrClass}>
            <td colSpan={2}>
            </td>
            <td colSpan={2} className='text'>
              <div onClick={() => toggleHidden()}className='text'>
                {card['Card Text']}
              </div>
            </td>
            <td colSpan={1} className='set'>
              <React.Fragment>
                {sets}
              </React.Fragment>
            </td>
          </tr>
        )}
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
