import React from 'react';
import {
  CardPopover,
  ButtonAddCard,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ConditionalOverlayTrigger,
} from 'components';
import { useApp } from 'context';

function ResultRecommendationLibraryTable(props) {
  const { nativeLibrary, isMobile } = useApp();
  let resultTrClass;

  const cardRows = props.cards.map((card, index) => {
    const handleClick = () => {
      props.handleModalCardOpen(props.cards[index]);
      isMobile && props.setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    const inDeck =
      (props.library &&
        props.library[card['Id']] &&
        props.library[card['Id']].q) ||
      0;

    let DisciplineOrClan;
    if (card['Clan']) {
      DisciplineOrClan = <ResultLibraryClan value={card['Clan']} />;
    } else {
      DisciplineOrClan = (
        <ResultLibraryDisciplines value={card['Discipline']} />
      );
    }

    return (
      <React.Fragment key={card['Id']}>
        <tr className={resultTrClass}>
          {props.isAuthor && props.activeDeck.deckid && (
            <td className="quantity-add pe-1">
              <ButtonAddCard
                cardid={card['Id']}
                deckid={props.activeDeck.deckid}
                card={card}
                inDeck={inDeck}
              />
            </td>
          )}
          <ConditionalOverlayTrigger
            placement={props.placement ? props.placement : 'right'}
            overlay={<CardPopover card={card} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick()}>
              <ResultLibraryName card={card} />
            </td>
          </ConditionalOverlayTrigger>

          <td
            className={card['Blood Cost'] ? 'cost blood' : 'cost'}
            onClick={() => handleClick()}
          >
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            {DisciplineOrClan}
          </td>
          <td className="burn" onClick={() => handleClick()}>
            <ResultLibraryBurn value={card['Burn Option']} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id]['Card Text']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="deck-library-table">
        <tbody>{cardRows}</tbody>
      </table>
    </>
  );
}

export default ResultRecommendationLibraryTable;
