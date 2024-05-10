import React from 'react';
import {
  TwdCardsHistoryCardAppearance,
  CardPopover,
  ConditionalTooltip,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
} from '@/components';
import { useApp } from '@/context';

const TwdCardsHistoryCryptRow = ({ card, players, handleClick }) => {
  const { isMobile } = useApp();

  return (
    <>
      <div
        className="flex min-w-[32px] items-center justify-center sm:min-w-[40px]"
        onClick={() => handleClick(card)}
      >
        <ResultCryptCapacity card={card} />
      </div>
      {!isMobile && (
        <div
          className="flex min-w-[170px] items-center lg:min-w-[180px]"
          onClick={() => handleClick(card)}
        >
          <ResultCryptDisciplines value={card.Disciplines} />
        </div>
      )}
      <div
        className={`flex w-full items-center justify-start ${card.deckid ? '' : 'font-bold'} `}
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
        <div className="min-w-[60px]" onClick={() => handleClick(card)}>
          <div className="flex justify-center">
            <ResultClanImage value={card.Clan} />
          </div>
          <div className="flex justify-center space-x-1 text-sm">
            <div className="flex w-full justify-end font-bold">
              {card.Title && <ResultCryptTitle value={card.Title} />}
            </div>
            <div className="w-full">
              <ResultCryptGroup value={card.Group} />
            </div>
          </div>
        </div>
      )}
      <TwdCardsHistoryCardAppearance card={card} byPlayer={players[card.player]} />
    </>
  );
};

export default TwdCardsHistoryCryptRow;
