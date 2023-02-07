import React from 'react';
import { useSnapshot } from 'valtio';
import { ButtonAddCard, ResultLibraryTableRowCommon } from '@/components';
import { deckStore } from '@/context';

const DeckRecommendationLibraryTable = ({ handleClick, cards }) => {
  const deck = useSnapshot(deckStore).deck;
  const isEditable = deck?.isAuthor && !deck?.isPublic && !deck?.isFrozen;

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card, idx) => {
          return (
            <tr
              key={card.Id}
              className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
                idx % 2
                  ? 'bg-bgThird dark:bg-bgThirdDark'
                  : 'bg-bgPrimary dark:bg-bgPrimaryDark'
              }`}
            >
              {isEditable && (
                <td>
                  <ButtonAddCard
                    cardid={card.Id}
                    deckid={deck.deckid}
                    card={card}
                    inDeck={deck.library[card.Id]?.q || 0}
                  />
                </td>
              )}
              <ResultLibraryTableRowCommon
                card={card}
                handleClick={handleClick}
                inDeck
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckRecommendationLibraryTable;
