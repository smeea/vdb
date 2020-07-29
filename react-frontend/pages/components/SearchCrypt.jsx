import React from 'react';

import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import SearchCryptDisciplines from './SearchCryptDisciplines.jsx';
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
    if (resultTrClass == 'crypt-result-even') {
      resultTrClass = 'crypt-result-odd';
    } else {
      resultTrClass = 'crypt-result-even';
    }
    return (
      <tr className={resultTrClass} key={index}>
        <ResultCryptCapacity value={card['Capacity']} />
        <SearchCryptDisciplines value={card['Disciplines']} />
        <ResultCryptName value={card['Name']} />
        <ResultCryptClan value={card['Clan']} />
        <ResultCryptGroup value={card['Group']} />
      </tr>
    );
  });

  return <tbody>{cards}</tbody>;
}

function SearchCrypt(props) {
  return (
    <div>
      <table className='crypt-result-table'>
        {/* <SearchCryptHeader /> */}
        <SearchCryptBody resultCards={props.cards} />
      </table>
    </div>
  );
}

export default SearchCrypt;
