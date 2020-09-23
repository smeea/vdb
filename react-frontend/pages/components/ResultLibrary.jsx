import React, { useState, useEffect } from 'react';

import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibrarySortForm from './ResultLibrarySortForm.jsx';
import ResultLibraryTotal from './ResultLibraryTotal.jsx';
import resultLibrarySort from './resultLibrarySort.js';
import ResultAddCard from './ResultAddCard.jsx';

function ResultLibraryBody(props) {
  let resultTrClass='library-result-even';

  const cards = props.resultCards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          { props.activeDeck && props.activeDeck != 'Select Deck' &&
            <td className='quantity'>
              <ResultAddCard deckCardAdd={props.deckCardAdd} cardid={card['Id']} />
            </td>
          }
          <td className='cost'>
            <ResultLibraryCost valueBlood={card['Blood Cost']} valuePool={card['Pool Cost']} />
          </td>
          <td className='type'>
            <ResultLibraryType cardtype={card['Type']} />
          </td>
          <td className='disciplines'>
            <ResultLibraryDisciplines value={card['Discipline']} />
          </td>
          <td className='name'>
            <ResultLibraryName
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              id={card['Id']}
              value={card['Name']}
              ban={card['Banned']}
              card={card}
            />
          </td>
          <td className='clan'>
            <ResultLibraryClan value={card['Clan']} />
          </td>
          <td className='burn'>
            <ResultLibraryBurn value={card['Burn Option']} />
            <ResultLibraryTrifle value={card['Card Text']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return <tbody>{cards}</tbody>;
}

function ResultLibrary(props) {
  const [sortedCards, setSortedCards] = useState([]);

  const handleChange = method => {
    props.setSortMethod(method);
    setSortedCards(() => resultLibrarySort(props.cards, method));
  };

  useEffect(() => {
    setSortedCards(() => resultLibrarySort(props.cards, props.sortMethod));
  }, [props.cards, props.sortMethod]);

  return (
    <>
      { props.showTotal == true && props.cards.length > 0 &&
        <ResultLibraryTotal cards={props.cards} />
      }
      { props.showSort == true && sortedCards.length > 0 &&
        <ResultLibrarySortForm value={props.sortMethod} onChange={handleChange} />
      }
      <table className='search-library-table'>
        <ResultLibraryBody
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

export default ResultLibrary;
