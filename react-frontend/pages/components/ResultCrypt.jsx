import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptText from './ResultCryptText.jsx';
import ResultCryptSortForm from './ResultCryptSortForm.jsx';
import resultCryptSort from './resultCryptSort.js';

function ResultAddCard(props) {
  const handleButton = () => props.cardAdd(props.cardid);
  return(
    <Button variant='outline-primary' onClick={handleButton}>
      +
    </Button>
  );
}

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

      console.log('props.mode', props.mode);
      return (
        <React.Fragment key={index}>
          <tr className={resultTrClass}>
            <ResultCryptCapacity value={card['Capacity']} />
            <ResultCryptDisciplines value={card['Disciplines']} />
            <ResultCryptName id={card['Id']} toggleHidden={toggleHidden} value={card['Name']} adv={card['Adv']} ban={card['Banned']} />
            <ResultCryptClan value={card['Clan']} />
            <ResultCryptGroup value={card['Group']} />
            { props.addMode &&
              <ResultAddCard cardAdd={props.cardAdd} cardid={card['Id']}/>
            }
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
        props.mode == undefined && sortedCards.length > 0 &&
          <ResultCryptSortForm value={sortMethod} onChange={handleChange} />
      }
      <table className='search-crypt-table'>
        <SearchCryptBody addMode={props.addMode} cardAdd={props.cardAdd} resultCards={sortedCards} />
      </table>
    </React.Fragment>
  );
}

export default ResultCrypt;
