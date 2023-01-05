import React from 'react';
import {
  CardPopover,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
  ConditionalTooltip,
} from 'components';
import { POOL_COST, BLOOD_COST, BURN_OPTION } from 'utils/constants';
import { isTrifle } from 'utils';
import { useApp } from 'context';

const Type = ({ card, handleClick }) => {
  return (
    <td className="min-w-[25px]" onClick={() => handleClick(card)}>
      <ResultLibraryTypeImage value={card.Type} />
    </td>
  );
};

const Cost = ({ card, handleClick }) => {
  return (
    <td
      className={`min-w-[30px] ${card[BLOOD_COST] ? 'pb-1' : ''}`}
      onClick={() => handleClick(card)}
    >
      {(card[BLOOD_COST] || card[POOL_COST]) && (
        <ResultLibraryCost
          valueBlood={card[BLOOD_COST]}
          valuePool={card[POOL_COST]}
        />
      )}
    </td>
  );
};

const Name = ({ card, handleClick, placement }) => {
  const { isMobile } = useApp();

  return (
    <td className="w-full" onClick={() => handleClick(card)}>
      <ConditionalTooltip
        placement={placement}
        overlay={<CardPopover card={card} />}
        disabled={isMobile}
        noPadding
      >
        <ResultLibraryName card={card} />
      </ConditionalTooltip>
    </td>
  );
};

const Disciplines = ({ card, handleClick }) => {
  return (
    <td
      className="flex min-w-[90px] items-center justify-center"
      onClick={() => handleClick(card)}
    >
      {card.Clan && <ResultLibraryClan value={card.Clan} />}
      {card.Discipline && card.Clan && '+'}
      {card.Discipline && <ResultLibraryDisciplines value={card.Discipline} />}
    </td>
  );
};

const Burn = ({ card, handleClick }) => {
  return (
    <td className="min-w-[30px]" onClick={() => handleClick(card)}>
      {card[BURN_OPTION] && <ResultLibraryBurn />}
      {isTrifle(card) && <ResultLibraryTrifle />}
    </td>
  );
};

const ResultLibraryTableRowCommon = ({
  card,
  handleClick,
  placement,
  inSearch,
  inDeck,
}) => {
  const { isDesktop, isNarrow, isWide } = useApp();

  return (
    <>
      {inDeck ? (
        <>
          <Name card={card} handleClick={handleClick} placement={placement} />
          {(!inSearch || (!isDesktop && !isNarrow) || isWide) && (
            <Cost card={card} handleClick={handleClick} />
          )}
          <Disciplines card={card} handleClick={handleClick} />
          {(!inSearch || (!isDesktop && !isNarrow) || isWide) && (
            <Burn card={card} handleClick={handleClick} />
          )}
        </>
      ) : (
        <>
          <Cost card={card} handleClick={handleClick} />
          <Type card={card} handleClick={handleClick} />
          <Disciplines card={card} handleClick={handleClick} />
          <Name card={card} handleClick={handleClick} placement={placement} />
          <Burn card={card} handleClick={handleClick} />
        </>
      )}
    </>
  );
};

export default ResultLibraryTableRowCommon;
