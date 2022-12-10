import React from 'react';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  ButtonAddCard,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ConditionalTooltip,
} from 'components';
import { BURN_OPTION, POOL_COST, BLOOD_COST } from 'utils/constants';
import { deckStore, useApp } from 'context';

const DeckRecommendationLibraryTable = ({ handleModalCardOpen, cards }) => {
  const { isDesktop, isMobile, setShowFloatingButtons } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const isEditable = deck?.isAuthor && !deck?.isPublic && !deck?.isFrozen;

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
          {isEditable && (
            <td className="quantity-add pr-1">
              <ButtonAddCard
                cardid={card.Id}
                deckid={deck.deckid}
                card={card}
                inDeck={inDeck}
              />
            </td>
          )}
          <ConditionalTooltip
            placement={isDesktop ? 'left' : 'bottom'}
            overlay={<CardPopover card={card} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick()}>
              <ResultLibraryName card={card} />
            </td>
          </ConditionalTooltip>

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
            <ResultLibraryTrifle card={card} />
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
