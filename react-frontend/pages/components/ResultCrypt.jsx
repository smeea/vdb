import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptSortForm from './ResultCryptSortForm.jsx';
import ResultCryptTotal from './ResultCryptTotal.jsx';
import resultCryptSort from './resultCryptSort.js';
import ResultAddCard from './ResultAddCard.jsx';

function SearchCryptBody(props) {
  let resultTrClass='crypt-result-even';

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
            { props.activeDeck && props.activeDeck != 'Select Deck' &&
              <td>
                <ResultAddCard deckCardAdd={props.deckCardAdd} cardid={card['Id']} />
              </td>
            }
            <td className='capacity'>
              <ResultCryptCapacity value={card['Capacity']} />
            </td>
            <td className='disciplines'>
              <ResultCryptDisciplines value={card['Disciplines']} />
            </td>
            <td className='name'>
              <ResultCryptName
                showImage={props.showImage}
                toggleImage={props.toggleImage}
                id={card['Id']}
                value={card['Name']}
                adv={card['Adv']}
                ban={card['Banned']}
                card={card}
              />
            </td>
            <td className='clan'>
              <ResultCryptClan value={card['Clan']} />
            </td>
            <td className='group'>
              <ResultCryptGroup value={card['Group']} />
            </td>
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

  const handleChange = event => {
    const method = event.target.value;
    props.setSortMethod(method);
    setSortedCards(() => resultCryptSort(props.cards, method));
  };

  useEffect(() => {
    setSortedCards(() => resultCryptSort(props.cards, props.sortMethod));
  }, [props.cards, props.sortMethod]);

  return (
    <>
      { props.cards.length > 0 &&
        <ResultCryptTotal cards={props.cards} />
      }
      { props.sortMode == true && sortedCards.length > 0 &&
        <ResultCryptSortForm value={props.sortMethod} onChange={handleChange} />
      }
      <table className='search-crypt-table'>
        <SearchCryptBody
          showImage={props.showImage}
          toggleImage={props.toggleImage}
          activeDeck={props.activeDeck}
          deckCardAdd={props.deckCardAdd}
          resultCards={sortedCards}
        />
      </table>
    </>
  );
}

export default ResultCrypt;
