import React, { useState } from 'react';

import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';

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

    const sets = Object.keys(card['Set']).map((key, index) => {
      return(
        <div className='sets' key={index}>
          {key}: {card['Set'][key]}
        </div>
      );
    });

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

        { hiddenState[card['Id']] == undefined || hiddenState[card['Id']] == true ? (
          null
        ) : (
          <tr className={resultTrClass}>
            <td colSpan={3}>
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

function ResultLibrary(props) {
  return (
    <React.Fragment>
      <table width='100%' className='search-library-table'>
        <SearchLibraryBody resultCards={props.cards} />
      </table>
    </React.Fragment>
  );
}

export default ResultLibrary;
