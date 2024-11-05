import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
  TwdCardsHistoryCardAppearance,
  CardPopover,
  ConditionalTooltip,
  ResultMiscImage,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultName,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
} from '@/components';
import { BURN_OPTION, POOL_COST, BLOOD_COST } from '@/constants';
import { useApp } from '@/context';

const TwdCardsHistoryLibraryRow = ({ card, players, handleClick }) => {
  const { isMobile } = useApp();

  return (
    <>
      {!isMobile && (
        <>
          <div
            className={twMerge(
              'flex min-w-[30px] items-center justify-center',
              card[BLOOD_COST] && 'pb-1',
            )}
            onClick={() => handleClick(card)}
          >
            {(card[BLOOD_COST] || card[POOL_COST]) && (
              <ResultLibraryCost valueBlood={card[BLOOD_COST]} valuePool={card[POOL_COST]} />
            )}
          </div>
          <div
            className="flex min-w-[40px] items-center justify-center"
            onClick={() => handleClick(card)}
          >
            <ResultLibraryTypeImage value={card.Type} />
          </div>
        </>
      )}
      <div
        className="flex min-w-[32px] items-center justify-center gap-1.5 sm:min-w-[80px]"
        onClick={() => handleClick(card)}
      >
        {card.Clan && <ResultLibraryClan value={card.Clan} />}
        {card.Discipline && <ResultLibraryDisciplines value={card.Discipline} />}
      </div>
      <div
        className={twMerge('flex w-full items-center justify-start', !card.deckid && 'font-bold')}
        onClick={() => handleClick(card)}
      >
        <ConditionalTooltip
          placement={'right'}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
        >
          <ResultName card={card} />
        </ConditionalTooltip>
      </div>
      {!isMobile && (
        <div
          className="flex min-w-[30px] items-center justify-center"
          onClick={() => handleClick(card)}
        >
          {card[BURN_OPTION] && <ResultMiscImage value={BURN_OPTION} />}
        </div>
      )}
      <TwdCardsHistoryCardAppearance card={card} byPlayer={players[card.player]} />
    </>
  );
};

export default TwdCardsHistoryLibraryRow;
