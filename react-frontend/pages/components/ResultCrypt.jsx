import React, { useState } from 'react';

import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';

function SearchCryptHeader(props) {
  return (
    <thead>
      <tr className='result-header'>
        <th>C</th>
        <th>D</th>
        <th>N</th>
        <th>C</th>
        <th>G</th>
      </tr>
    </thead>
  );
}

function SearchCryptBody(props) {
  let resultTrClass='crypt-result-even';
  const cards = props.resultCards.map((card, index) => {
    const [hidden, setHidden] = useState(true);

    const toggleHidden = () => {
      if (hidden) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    };

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
          <ResultCryptName toggleHidden={toggleHidden} value={card['Name']} adv={card['Adv']} ban={card['Banned']} />
          <ResultCryptClan value={card['Clan']} />
          <ResultCryptGroup value={card['Group']} />
        </tr>
        { hidden ? (
          null
        ) : (
          <tr className={resultTrClass}>
            <td colSpan={2}>
            </td>
            <td colSpan={3} className='text'>
              <div onClick={() => toggleHidden()}className='text'>
                {card['Card Text']}
              </div>
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
    <div>
      <table className='search-crypt-table'>
        {/* <SearchCryptHeader /> */}
        <SearchCryptBody resultCards={props.cards} />
      </table>
    </div>
  );
}

export default ResultCrypt;
