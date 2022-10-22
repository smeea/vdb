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
import { BURN_OPTION, POOL_COST, BLOOD_COST, CARD_TEXT } from 'utils/constants';
import { useApp } from 'context';

const DeckRecommendationLibraryTable = ({ handleModalCardOpen, cards }) => {
  const { deck, nativeLibrary, isDesktop, isMobile, setShowFloatingButtons } =
    useApp();

  const cardRows = cards.map((card, idx) => {
    const handleClick = () => {
      handleModalCardOpen(cards[idx]);
      setShowFloatingButtons(false);
    };

    const inDeck = deck.library[card.Id]?.q || 0;

    const DisciplineOrClan = card.Clan ? (
      <ResultLibraryClan value={card.Clan} />
    ) : (
      <ResultLibraryDisciplines value={card.Discipline} />
    );

    return (
      <React.Fragment key={card.Id}>
        <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          {deck.isAuthor && (
            <td className="quantity-add pe-1">
              <ButtonAddCard
                cardid={card.Id}
                deckid={deck.deckid}
                card={card}
                inDeck={inDeck}
              />
            </td>
          )}
          <ConditionalOverlayTrigger
            placement={isDesktop ? 'left' : 'bottom'}
            overlay={<CardPopover card={card} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick()}>
              <ResultLibraryName card={card} />
            </td>
          </ConditionalOverlayTrigger>

          <td
            className={card[BLOOD_COST] ? 'cost blood' : 'cost'}
            onClick={() => handleClick()}
          >
            <ResultLibraryCost
              valueBlood={card[BLOOD_COST]}
              valuePool={card[POOL_COST]}
            />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            {DisciplineOrClan}
          </td>
          <td className="burn" onClick={() => handleClick()}>
            <ResultLibraryBurn value={card[BURN_OPTION]} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id][CARD_TEXT]} />
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
};

export default DeckRecommendationLibraryTable;
