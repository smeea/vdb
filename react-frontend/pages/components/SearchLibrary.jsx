import React from 'react';

import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';

function SearchLibraryHeader(props) {
  return (
    <thead>
      <tr className='result-header'>
        <th>C</th>
        <th>T</th>
        <th>D</th>
        <th>N</th>
        <th>C</th>
        <th>B</th>
      </tr>
    </thead>
  );
}

function SearchLibraryBody(props) {
  let resultTrClass='library-result-even';
  const cards = props.resultCards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }
    return (
      <tr className={resultTrClass} key={index}>
        <ResultLibraryCost valueBlood={card['Blood Cost']} valuePool={card['Pool Cost']} />
        <ResultLibraryType cardtype={card['Type']} />
        <ResultLibraryDisciplines value={card['Discipline']} />
        <ResultLibraryName value={card['Name']} />
        <ResultLibraryClan value={card['Clan']} />
        <ResultLibraryBurn value={card['Burn Option']} />
      </tr>
    );
  });

  return <tbody>{cards}</tbody>;
}

function SearchLibrary(props) {
  return (
    <div>
      <table width="100%" className="library-result-table">
        {/* <SearchLibraryHeader /> */}
        <SearchLibraryBody resultCards={props.cards} />
      </table>
    </div>
  );
}

export default SearchLibrary;
