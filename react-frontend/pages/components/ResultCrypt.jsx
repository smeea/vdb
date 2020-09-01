import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptSortForm from './ResultCryptSortForm.jsx';
import resultCryptSort from './resultCryptSort.js';
import ResultAddCard from './ResultAddCard.jsx';

function SearchCryptBody(props) {
  let resultTrClass='crypt-result-even';

  const [showImage, setShowImage] = useState(false);
  const toggleImage = () => setShowImage(!showImage);

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
            { props.addMode &&
              <ResultAddCard cardAdd={props.cardAdd} cardid={card['Id']}/>
            }
            <ResultCryptCapacity value={card['Capacity']} />
            <ResultCryptDisciplines value={card['Disciplines']} />
            <ResultCryptName showImage={showImage} toggleImage={toggleImage} id={card['Id']} value={card['Name']} adv={card['Adv']} ban={card['Banned']} addMode={props.addMode} card={card} />
            <ResultCryptClan value={card['Clan']} />
            <ResultCryptGroup value={card['Group']} />
          </tr>
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
        props.sortMode == true && sortedCards.length > 0 &&
          <ResultCryptSortForm value={sortMethod} onChange={handleChange} />
      }
      <table className='search-crypt-table'>
        <SearchCryptBody addMode={props.addMode} cardAdd={props.cardAdd} resultCards={sortedCards} />
      </table>
    </React.Fragment>
  );
}

export default ResultCrypt;
