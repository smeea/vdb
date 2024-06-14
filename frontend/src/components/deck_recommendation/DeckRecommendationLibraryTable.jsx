import React from 'react';
import { useSnapshot } from 'valtio';
import { DeckRecommendationLibraryTableRow } from '@/components';
import { deckStore } from '@/context';

const DeckRecommendationLibraryTable = ({ handleClick, cards }) => {
  const deck = useSnapshot(deckStore).deck;

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card) => {
          return (
            <DeckRecommendationLibraryTableRow
              key={card.Id}
              card={card}
              deck={deck}
              handleClick={handleClick}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckRecommendationLibraryTable;
