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
import { TYPE, CLAN, DISCIPLINE, DECKID, PLAYER, BURN, POOL, BLOOD } from '@/constants';
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
              card[BLOOD] && 'pb-1',
            )}
            onClick={() => handleClick(card)}
          >
            {(card[BLOOD] || card[POOL]) && (
              <ResultLibraryCost valueBlood={card[BLOOD]} valuePool={card[POOL]} />
            )}
          </div>
          <div
            className="flex min-w-[40px] items-center justify-center"
            onClick={() => handleClick(card)}
          >
            <ResultLibraryTypeImage value={card[TYPE]} />
          </div>
        </>
      )}
      <div
        className="flex min-w-[32px] items-center justify-center gap-1.5 sm:min-w-[80px]"
        onClick={() => handleClick(card)}
      >
        {card[CLAN] && <ResultLibraryClan value={card[CLAN]} />}
        {card[DISCIPLINE] && <ResultLibraryDisciplines value={card[DISCIPLINE]} />}
      </div>
      <div
        className={twMerge('flex w-full items-center justify-start', !card[DECKID] && 'font-bold')}
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
          {card[BURN] && <ResultMiscImage value={BURN} />}
        </div>
      )}
      <TwdCardsHistoryCardAppearance card={card} byPlayer={players[card[PLAYER]]} />
    </>
  );
};

export default TwdCardsHistoryLibraryRow;
