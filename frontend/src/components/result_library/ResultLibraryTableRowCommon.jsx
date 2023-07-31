import React from 'react';
import {
  CardPopover,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
  ConditionalTooltip,
} from '@/components';
import { POOL_COST, BLOOD_COST, BURN_OPTION } from '@/utils/constants';
import { isTrifle } from '@/utils';
import { useApp } from '@/context';

const Type = ({ card, handleClick }) => {
  return (
    <td
      className="min-w-[50px] sm:min-w-[60px]"
      onClick={() => handleClick(card)}
    >
      <div className="flex justify-center">
        <ResultLibraryTypeImage value={card.Type} />
      </div>
    </td>
  );
};

const Cost = ({ card, handleClick }) => {
  return (
    <td
      className="min-w-[25px] sm:min-w-[30px]"
      onClick={() => handleClick(card)}
    >
      <div className={`{card[BLOOD_COST] ? 'pb-2' : ''} flex justify-center`}>
        {(card[BLOOD_COST] || card[POOL_COST]) && (
          <ResultLibraryCost
            valueBlood={card[BLOOD_COST]}
            valuePool={card[POOL_COST]}
          />
        )}
      </div>
    </td>
  );
};

const Name = ({ card, handleClick, shouldShowModal }) => {
  const { isMobile } = useApp();

  return (
    <td className="w-full" onClick={() => handleClick(card)}>
      <ConditionalTooltip
        overlay={<CardPopover card={card} />}
        disabled={isMobile || shouldShowModal}
        noPadding
      >
        <div className="flex cursor-pointer px-1">
          <ResultName card={card} />
        </div>
      </ConditionalTooltip>
    </td>
  );
};

const Disciplines = ({ card, handleClick }) => {
  return (
    <td
      className="min-w-[60px] sm:min-w-[90px]"
      onClick={() => handleClick(card)}
    >
      <div className="flex items-center justify-center">
        {card.Clan && <ResultLibraryClan value={card.Clan} />}
        {card.Discipline && card.Clan && '+'}
        {card.Discipline && (
          <ResultLibraryDisciplines value={card.Discipline} />
        )}
      </div>
    </td>
  );
};

const Burn = ({ card, handleClick }) => {
  return (
    <td className="min-w-[30px]" onClick={() => handleClick(card)}>
      <div className="flex justify-center">
        {card[BURN_OPTION] && <ResultLibraryBurn />}
        {isTrifle(card) && <ResultLibraryTrifle />}
      </div>
    </td>
  );
};

const ResultLibraryTableRowCommon = ({
  card,
  handleClick,
  inSearch,
  inDeck,
  shouldShowModal,
  noBurn,
}) => {
  const { isDesktop, isNarrow, isWide } = useApp();

  return (
    <>
      {inDeck ? (
        <>
          <Name
            card={card}
            handleClick={handleClick}
            shouldShowModal={shouldShowModal}
          />
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
          <Name
            card={card}
            handleClick={handleClick}
            shouldShowModal={shouldShowModal}
          />
          {!noBurn && <Burn card={card} handleClick={handleClick} />}
        </>
      )}
    </>
  );
};

export default ResultLibraryTableRowCommon;
