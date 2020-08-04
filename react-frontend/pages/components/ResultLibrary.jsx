import React, { useState } from 'react';

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
    const [hidden, setHidden] = useState(true);

    const toggleHidden = () => {
      if (hidden) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    };

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
        <ResultLibraryName toggleHidden={toggleHidden} value={card['Name']} ban={card['Banned']} />
        <ResultLibraryClan value={card['Clan']} />
        <ResultLibraryBurn value={card['Burn Option']} />
      </tr>

      { hidden ? (
        null
      ) : (
        <tr className={resultTrClass}>
          <td colSpan={3}>
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

function ResultLibrary(props) {
  return (
    <div>
      <table width="100%" className="search-library-table">
        {/* <SearchLibraryHeader /> */}
        <SearchLibraryBody resultCards={props.cards} />
      </table>
    </div>
  );
}

export default ResultLibrary;
