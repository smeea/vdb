import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
  CardPopover,
  ResultLibraryCost,
  ResultLibraryTableRowReqClanDis,
  ResultName,
  ResultMiscImage,
  ResultLibraryTypeImage,
  ConditionalTooltip,
} from '@/components';
import { TYPE, TRIFLE, BLOOD, BURN } from '@/constants';
import { useApp } from '@/context';

const Type = ({ card, handleClick }) => {
  return (
    <td className="min-w-[50px] sm:min-w-[60px]" onClick={() => handleClick(card)}>
      <div className="flex justify-center">
        <ResultLibraryTypeImage value={card[TYPE]} />
      </div>
    </td>
  );
};

const Cost = ({ card, handleClick }) => {
  return (
    <td className="min-w-[25px] sm:min-w-[30px]" onClick={() => handleClick(card)}>
      <div className={twMerge(card[BLOOD] && 'pb-1.5', 'flex justify-center')}>
        <ResultLibraryCost card={card} />
      </div>
    </td>
  );
};

const Name = ({ card, handleClick, shouldShowModal, isBanned }) => {
  const { isMobile } = useApp();

  return (
    <td className="w-full" onClick={() => handleClick(card)}>
      <ConditionalTooltip
        overlay={<CardPopover card={card} />}
        disabled={isMobile || shouldShowModal}
        noPadding
      >
        <div className="flex cursor-pointer px-1">
          <ResultName card={card} isBanned={isBanned} />
        </div>
      </ConditionalTooltip>
    </td>
  );
};

const BurnTrifle = ({ card, handleClick }) => {
  return (
    <td className="min-w-[30px]" onClick={() => handleClick(card)}>
      <div className="flex justify-center">
        {card[BURN] && <ResultMiscImage value={BURN} />}
        {card[TRIFLE] && <ResultMiscImage value={TRIFLE} />}
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
  isBanned,
}) => {
  const { isNarrow } = useApp();

  return (
    <>
      {inDeck ? (
        <>
          <Name
            card={card}
            handleClick={handleClick}
            shouldShowModal={shouldShowModal}
            isBanned={isBanned}
          />
          {(!inSearch || !isNarrow) && <Cost card={card} handleClick={handleClick} />}
          <ResultLibraryTableRowReqClanDis card={card} handleClick={handleClick} />
          {(!inSearch || !isNarrow) && <BurnTrifle card={card} handleClick={handleClick} />}
        </>
      ) : (
        <>
          <Cost card={card} handleClick={handleClick} />
          <Type card={card} handleClick={handleClick} />
          <ResultLibraryTableRowReqClanDis card={card} handleClick={handleClick} />
          <Name
            card={card}
            handleClick={handleClick}
            shouldShowModal={shouldShowModal}
            isBanned={isBanned}
          />
          {!noBurn && <BurnTrifle card={card} handleClick={handleClick} />}
        </>
      )}
    </>
  );
};

export default ResultLibraryTableRowCommon;
