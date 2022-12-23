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
import { isTrifle } from 'utils';
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

    return (
      <React.Fragment key={card.Id}>
        <tr
          className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
            idx % 2
              ? 'bg-bgThird dark:bg-bgThirdDark'
              : 'bg-bgPrimary dark:bg-bgPrimaryDark'
          }`}
        >
          {isEditable && (
            <td className="quantity-add ">
              <ButtonAddCard
                cardid={card.Id}
                deckid={deck.deckid}
                card={card}
                inDeck={inDeck}
              />
            </td>
          )}
          <td className="name " onClick={() => handleClick()}>
            <ConditionalTooltip
              placement={isDesktop ? 'left' : 'bottom'}
              overlay={<CardPopover card={card} />}
              disabled={isMobile}
            >
              <ResultLibraryName card={card} />
            </ConditionalTooltip>
          </td>
          <td
            className={card[BLOOD_COST] ? 'cost blood' : 'cost'}
            onClick={() => handleClick()}
          >
            {(card[BLOOD_COST] || card[POOL_COST]) && (
              <ResultLibraryCost
                valueBlood={card[BLOOD_COST]}
                valuePool={card[POOL_COST]}
              />
            )}
          </td>
          <td className="disciplines " onClick={() => handleClick()}>
            {card.Clan && <ResultLibraryClan value={card.Clan} />}
            {card.Discipline && card.Clan && '+'}
            {card.Discipline && (
              <ResultLibraryDisciplines value={card.Discipline} />
            )}
          </td>
          <td className="burn" onClick={() => handleClick()}>
            {card[BURN_OPTION] && (
              <ResultLibraryBurn value={card[BURN_OPTION]} />
            )}
            {isTrifle(card) && <ResultLibraryTrifle />}
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
