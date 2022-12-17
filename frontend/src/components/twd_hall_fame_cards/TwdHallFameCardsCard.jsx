import React from 'react';
import { useApp } from 'context';
import {
  ResultCryptTableRowCommon,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ConditionalTooltip,
  CardPopover,
  TwdOpenDeckButton,
} from 'components';
import { POOL_COST, BLOOD_COST, BURN_OPTION } from 'utils/constants';
import { isTrifle } from 'utils';

const TwdHallFameCardsCard = ({ card, idx, handleClick }) => {
  const { isMobile, isNarrow } = useApp();

  return (
    <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
      {card.Id > 200000 ? (
        <ResultCryptTableRowCommon
          card={card}
          handleClick={() => handleClick(idx)}
        />
      ) : (
        <>
          <td
            className={card[BLOOD_COST] ? 'cost blood ' : 'cost '}
            onClick={() => handleClick(idx)}
          >
            <ResultLibraryCost
              valueBlood={card[BLOOD_COST]}
              valuePool={card[POOL_COST]}
            />
          </td>
          <td className="type " onClick={() => handleClick(idx)}>
            <ResultLibraryTypeImage value={card.Type} />
          </td>
          <td className="disciplines " onClick={() => handleClick(idx)}>
            {card.Clan && <ResultLibraryClan value={card.Clan} />}
            {card.Discipline && card.Clan && '+'}
            {card.Discipline && (
              <ResultLibraryDisciplines value={card.Discipline} />
            )}
          </td>
          <td className="name " onClick={() => handleClick(idx)}>
            <ConditionalTooltip
              placement={isNarrow ? 'bottom' : 'right'}
              overlay={<CardPopover card={card} />}
              disabled={isMobile}
            >
              <ResultLibraryName card={card} />
            </ConditionalTooltip>
          </td>
          {!isMobile && (
            <td className="burn " onClick={() => handleClick(idx)}>
              {card[BURN_OPTION] && <ResultLibraryBurn />}
              {isTrifle(card) && <ResultLibraryTrifle />}
            </td>
          )}
        </>
      )}
      {!isMobile && (
        <td className=" text-center" onClick={() => handleClick(idx)}>
          {card.releaseDate.slice(0, 4)}
        </td>
      )}
      <td className=" text-center" onClick={() => handleClick(idx)}>
        {card.twdDate.slice(0, 4)}
      </td>
      <td className=" text-center">
        {Math.round(
          (new Date(card.twdDate) - new Date(card.releaseDate)) /
            (1000 * 60 * 60 * 24) /
            365
        ) || 1}
      </td>
      <td className={`${isMobile ? '' : ''}`}>
        {card.deckid && (
          <div>
            <TwdOpenDeckButton
              deckid={card.deckid}
              noText={isMobile}
              inHistory
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default TwdHallFameCardsCard;
